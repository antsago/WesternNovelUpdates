import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './user/authentication.service'
import { LoginService } from './user/login.service'
import { ListNovel, List, Chapter } from './Interfaces'

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
                this.defaultList = null
                this.readChapters = []
                this.lists = []
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
        await this.db.renameList(this.login.user.uid, list, newName)
        this.lists.forEach(l =>
        {
            if (l.listId === list.listId)
            {
                l.listName = newName
            }
        })
    }

    private checkListNameIsValid(listName: string)
    {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

        if (!listName || specialCharacters.test(listName))
        {
            throw new Error('A list must have a name that only consists of letters and numbers')
        }
    }
}
