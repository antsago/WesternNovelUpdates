import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessageService, ListsService, BookmarkService,
    UserService, GoogleAnalyticsService } from '@app/core'
import { Chapter, DatabaseService, Novel } from 'wnu-shared'

@Component(
{
    templateUrl: './latestChapters.component.html'
})
export class LatestChaptersComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    public chapters: Chapter[]
    private novels: {[id: string]: Novel}

    constructor(private db: DatabaseService, private route: ActivatedRoute,
        private login: UserService, public read: BookmarkService,
        public lists: ListsService, private as: MessageService,
        public ga: GoogleAnalyticsService) {}

    async ngOnInit()
    {
        this.chapters = this.route.snapshot.data['chapters']
        this.novels = this.route.snapshot.data['novels'].reduce((map, novel) =>
        {
            map[novel.id] = novel
            return map
        }, {})
    }

    async getMoreUpdates()
    {
        const lastDate = this.chapters[this.chapters.length - 1]['publicationDate']
        const newUpdates = await this.db.chapters.getLatestsAfter(lastDate, this.NumberOfUpdates)
        this.chapters = [...this.chapters, ...newUpdates]

        this.ga.emitEvent('get more updates', 'Reading')
    }
}
