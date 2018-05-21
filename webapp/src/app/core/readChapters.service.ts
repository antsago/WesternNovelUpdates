import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { DatabaseService, Bookmarks, Chapter, ChapterState } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

@Injectable()
export class ReadChaptersService
{
    private userId: string
    public readChapters = [] as string[]
    public bookmarks = {} as Bookmarks

    constructor(private db: DatabaseService, private user: UserService, private ga: GoogleAnalyticsService)
    {
        this.user.doOnLoginChange(async () =>
        {
            this.userId = this.user.isLoggedIn ? this.user.fbUser.uid : null
            this.bookmarks = this.user.isLoggedIn ? this.user.wnuUser.bookmarks : null
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

    async setBookmark(chapter: Chapter)
    {
        const bookmark = {chapterId: chapter.guid, publicationDate: chapter.publicationDate}
        this.bookmarks[chapter.novel] = bookmark
        await this.db.users.setBookmark(this.userId, chapter.novel, bookmark)

        this.ga.emitEvent('set bookmark', 'Reading')
    }

    async removeBookmark(chapter: Chapter)
    {
        delete this.bookmarks[chapter.novel]
        await this.db.users.removeBookmark(this.userId, chapter.novel)

        this.ga.emitEvent('removed bookmark', 'Reading')
    }

    chapterState(chapter: Chapter): ChapterState
    {
        if (!this.bookmarks || !this.bookmarks[chapter.novel])
        {
            return 'Unread'
        }
        const bookmark = this.bookmarks[chapter.novel]

        if (bookmark.chapterId === chapter.guid)
        {
            return 'Bookmarked'
        }

        return chapter.publicationDate <= bookmark.publicationDate ? 'Read' : 'Unread'
    }
}
