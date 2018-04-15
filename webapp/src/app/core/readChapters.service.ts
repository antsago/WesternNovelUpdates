import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { UserService } from './user.service'

@Injectable()
export class ReadChaptersService
{
    private userId: string
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private user: UserService)
    {
        this.user.doOnLoginChange(async () =>
        {
            this.userId = this.user.isLoggedIn ? this.user.fbUser.uid : null
            this.readChapters = this.user.isLoggedIn ? await this.db.getReadChapters(this.userId) : []
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await Promise.all(chaptersGUID.map(chapterId => this.db.addReadChapter(this.userId, chapterId)))
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await Promise.all(chaptersGUID.map(chapterId => this.db.removeReadChapter(this.userId, chapterId)))
    }
}
