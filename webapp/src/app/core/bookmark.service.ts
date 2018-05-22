import { Injectable } from '@angular/core'
import { DatabaseService, Bookmarks, Chapter, ChapterState } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'
import { UserService } from './user.service'
import { ListsService } from './lists.service'
import { MessageService } from './message.service'

@Injectable()
export class BookmarkService
{
    private userId: string
    public bookmarks = {} as Bookmarks

    constructor(private db: DatabaseService, private user: UserService,
        private ga: GoogleAnalyticsService, private lists: ListsService,
        private as: MessageService)
    {
        this.user.doOnLoginChange(async () =>
        {
            this.userId = this.user.isLoggedIn ? this.user.fbUser.uid : null
            this.bookmarks = this.user.isLoggedIn ? this.user.wnuUser.bookmarks : {}
        })
    }

    async setBookmark(chapter: Chapter, novelTitle: string)
    {
        if (this.user.isLoggedIn)
        {
            if (!this.lists.novelIsInList(chapter.novel))
            {
                const novel = { novelId: chapter.novel, novelTitle: novelTitle }
                await this.lists.addNovelsToList([novel], this.lists.getDefaultList())
                const message = `Novel ${novelTitle} added to "${this.lists.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
            }
            await this.setBookmarkInChapter(chapter)
        }
        else
        {
            await this.user.login()
        }
    }

    private async setBookmarkInChapter(chapter: Chapter)
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
