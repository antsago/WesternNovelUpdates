import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './authentication.service'
import { ListNovel, List } from './Interfaces'

const INITIAL_LIST =
{
    listId: null,
    listName: 'Reading',
    novels: []
}

@Injectable()
export class ListsService
{
    private userId: string
    public lists = [] as List[]
    public defaultList = null as {listId: string, listName: string}

    constructor(private db: DatabaseService, private auth: AuthenticationService)
    {
        this.auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            if (isLoggedIn)
            {
                try
                {
                    this.userId = user.uid

                    const listsPromise = this.db.getLists(this.userId)
                    this.defaultList = (await this.db.getUser(this.userId)).defaultList
                    this.lists = await listsPromise
                }
                catch (err) // user object doesn't exists
                {
                    await this.db.createUser(this.userId)
                    const defaultList = await this.db.addList(this.userId, INITIAL_LIST)
                    await this.db.setDefaultList(this.userId, defaultList)

                    this.defaultList = defaultList
                    this.lists = [defaultList]
                }
            }
            else
            {
                this.userId = null
                this.defaultList = null
                this.lists = []
            }
        })
    }

    public async addNewList(listName: string): Promise<void>
    {
        this.checkListNameIsValid(listName)

        const newList = await this.db.addList(this.userId, {listId: null, listName: listName, novels: []})
        this.lists.push(newList)
    }

    public async setDefaultList(list: List): Promise<void>
    {
        await this.db.setDefaultList(this.userId, list)
        this.defaultList = list
    }

    public async renameList(list: List, newName: string): Promise<void>
    {
        this.checkListNameIsValid(newName)
        await this.db.renameList(this.userId, list.listId, newName)
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
        await this.db.deleteList(this.userId, list.listId)
        this.lists = this.lists.filter(l => l.listId !== list.listId)

        await this.addNovelsToList(list.novels, this.getDefaultList())
    }

    public async addNovelsToList(novels: ListNovel[], list: List): Promise<void>
    {
        list.novels = list.novels.concat(novels)
        await this.db.setNovelsOfList(this.userId, list.novels, list.listId)
    }

    public async deleteNovelFromList(novel: ListNovel, list: List): Promise<void>
    {
        list.novels = list.novels.filter(n => n.novelId !== novel.novelId)
        await this.db.setNovelsOfList(this.userId, list.novels, list.listId)
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
