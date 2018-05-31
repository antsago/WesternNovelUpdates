import { Component, Input } from '@angular/core'
import { BookmarkService, GoogleAnalyticsService } from '@app/core'
import { Novel, Chapter, DatabaseService } from 'wnu-shared'

const ChapterAddRate = 10

@Component(
{
    selector: 'wnu-NovelChapters',
    templateUrl: './novelChapters.component.html'
})
export class NovelChaptersComponent
{
    @Input() novel: Novel
    @Input() chapters: Chapter[]

    constructor(public read: BookmarkService, private db: DatabaseService,
        public ga: GoogleAnalyticsService){}

    linkClicked()
    {
        this.ga.emitEvent('open link', 'Reading')
    }

    async getMoreChapters()
    {
        const lastDate = this.chapters[this.chapters.length - 1]['publicationDate']
        const newUpdates = await this.db.chapters.getNovelChaptersAfter(this.novel.id, lastDate, ChapterAddRate)
        this.chapters = [...this.chapters, ...newUpdates]

        this.ga.emitEvent('get more novel chaters', 'Reading')
    }
}
