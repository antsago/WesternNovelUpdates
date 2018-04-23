import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { DatabaseService } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

@Injectable()
export class ReadChaptersService
{
    private userId: string
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private user: UserService, private ga: GoogleAnalyticsService)
    {
        this.user.doOnLoginChange(async () =>
        {
            this.userId = this.user.isLoggedIn ? this.user.fbUser.uid : null
            this.readChapters = this.user.isLoggedIn ? await this.db.users.readChapters(this.userId).getAll() : []
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await Promise.all(chaptersGUID.map(chapterId => this.db.users.readChapters(this.userId).add(chapterId)))

        this.ga.emitEvent('mark read', 'Reading')
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await Promise.all(chaptersGUID.map(chapterId => this.db.users.readChapters(this.userId).remove(chapterId)))

        this.ga.emitEvent('mark unread', 'Reading')
    }
}
