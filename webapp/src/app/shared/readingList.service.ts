import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './user/authentication.service'
import { LoginService } from './user/login.service'
import { ListNovel, DbList, Chapter } from './Interfaces'

@Injectable()
export class ReadingListService
{
    public readChapters = [] as string[]
    public lists = [] as [string, ListNovel[]][]
    public defaultList = null as string

    constructor(private db: DatabaseService, private auth: AuthenticationService, private login: LoginService)
    {
        this.auth.callOnAuthStateChanged(async () =>
        {
            try
            {
                if (this.login.isLoggedIn)
                {
                    const chaptersPromise = this.db.getReadChapters(this.login.user.uid)
                    const wnuUser = await this.db.getUser(this.login.user.uid)

                    this.defaultList = wnuUser.defaultList
                    this.lists = this.listsToArray(wnuUser.lists)
                    this.readChapters = await chaptersPromise
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
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

        if (!listName || specialCharacters.test(listName) || this.lists.map(l => l[0]).includes(listName))
        {
            throw new Error('A list name cannot be empty, already exist and must consist of only letters and numbers')
        }

        await this.db.addList(this.login.user.uid, listName)
        this.lists.push([listName, []])
    }

    private listsToArray(lists: DbList): [string, ListNovel[]][]
    {
        return Object.keys(lists).map<[string, ListNovel[]]>(listName => [listName, lists[listName]])
    }
}
