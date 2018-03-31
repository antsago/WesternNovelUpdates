import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './authentication.service'
import { LoginService } from './login.service'
import { ListNovel, DbList, Chapter } from './Interfaces'

@Injectable()
export class ReadingListService
{
    public readChapters = [] as string[]
    public lists = [] as [string, ListNovel[]][]
    public defaultList = null as string
    public novelChapters: Map<string, Chapter[]>

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
                    await this.getNovelChapters()
                }
                else
                {
                    this.novelChapters = new Map()
                    this.defaultList = null
                    this.readChapters = []
                    this.lists = []
                }
            }
            catch (err) // user object doesn't exists
            {
                this.novelChapters = new Map()
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

    private listsToArray(lists: DbList): [string, ListNovel[]][]
    {
        return Object.keys(lists).map<[string, ListNovel[]]>(listName => [listName, lists[listName]])
    }

    private async getNovelChapters()
    {
        const novelIds = this.lists.reduce((compiledIds, [listName, novels]) =>
        {
            return compiledIds.concat(novels.map(novel => novel.novelId))
        }, [] as string[])

        this.novelChapters = new Map()
        novelIds.forEach(async novelId =>
        {
            const chapters = await this.db.getNovelChapters(novelId)
            this.novelChapters[novelId] = chapters
        })
    }
}
