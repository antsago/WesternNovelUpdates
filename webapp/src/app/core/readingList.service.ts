import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './user/authentication.service'
import { LoginService } from './user/login.service'
import { ListNovel, List, Chapter } from './Interfaces'

const INITIAL_LIST =
{
    listId: null,
    listName: 'Reading',
    novels: []
}

@Injectable()
export class ReadingListService
{
    public readChapters = [] as string[]
    public lists = [] as List[]
    public defaultList = null as {listId: string, listName: string}

    constructor(private db: DatabaseService, private auth: AuthenticationService, private login: LoginService)
    {
        this.auth.callOnAuthStateChanged(async () =>
        {
            try
            {
                if (this.login.isLoggedIn)
                {
                    const chaptersPromise = this.db.getReadChapters(this.login.user.uid)
                    const listsPromise = this.db.getLists(this.login.user.uid)
                    const wnuUser = await this.db.getUser(this.login.user.uid)

                    this.defaultList = wnuUser.defaultList
                    this.readChapters = await chaptersPromise
                    this.lists = await listsPromise
                }
                else
                {
                    this.defaultList = null
                    this.readChapters = []
                    this.lists = []
                }
            }
            catch (err) // user object doesn't exists
            {
                await this.db.createUser(this.login.user.uid)
                const defaultList = await this.db.addList(this.login.user.uid, INITIAL_LIST)
                await this.db.setDefaultList(this.login.user.uid, defaultList)

                this.defaultList = defaultList
                this.readChapters = []
                this.lists = [defaultList]
            }
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await Promise.all(chaptersGUID.map(chapterId => this.db.addReadChapter(this.login.user.uid, chapterId)))
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await Promise.all(chaptersGUID.map(chapterId => this.db.removeReadChapter(this.login.user.uid, chapterId)))
    }

    public async addNewList(listName: string): Promise<void>
    {
        this.checkListNameIsValid(listName)

        const newList = await this.db.addList(this.login.user.uid, {listId: null, listName: listName, novels: []})
        this.lists.push(newList)
    }

    public async setDefaultList(list: List): Promise<void>
    {
        await this.db.setDefaultList(this.login.user.uid, list)
        this.defaultList = list
    }

    public async renameList(list: List, newName: string): Promise<void>
    {
        this.checkListNameIsValid(newName)
        await this.db.renameList(this.login.user.uid, list.listId, newName)
        list.listName = newName

        if (this.defaultList.listId === list.listId)
        {
            await this.setDefaultList({ listId: list.listId, listName: newName })
        }
    }

    public async deleteList(list: List): Promise<void>
    {
        if (list.listId === this.defaultList.listId)
        {
            throw new Error('Default list cannot be deleted')
        }
        await this.db.deleteList(this.login.user.uid, list.listId)
        this.lists = this.lists.filter(l => l.listId !== list.listId)

        await this.addNovelsToList(list.novels, this.getDefaultList())
    }

    public async addNovelsToList(novels: ListNovel[], list: List): Promise<void>
    {
        list.novels = list.novels.concat(novels)
        await this.db.setNovelsOfList(this.login.user.uid, list.novels, list.listId)
    }

    public async deleteNovelFromList(novel: ListNovel, list: List): Promise<void>
    {
        list.novels = list.novels.filter(n => n.novelId !== novel.novelId)
        await this.db.setNovelsOfList(this.login.user.uid, list.novels, list.listId)
    }

    public async moveNovel(novel: ListNovel, from: List, to: List): Promise<void>
    {
        await this.addNovelsToList([novel], to)
        await this.deleteNovelFromList(novel, from)
    }

    private checkListNameIsValid(listName: string)
    {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

        if (!listName || specialCharacters.test(listName))
        {
            throw new Error('A list must have a name that only consists of letters and numbers')
        }
    }

    public getDefaultList(): List
    {
        return this.lists.find(l => l.listId === this.defaultList.listId)
    }

    public novelWithList(novelId: string): List
    {
        return this.lists.find(list => list.novels.some(n => n.novelId === novelId))
    }

    public novelIsInList(novelId: string): boolean
    {
        return this.novelWithList(novelId) !== undefined
    }
}
