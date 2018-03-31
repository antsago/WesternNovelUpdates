import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Chapter, Novel } from '../../shared/Interfaces'
import { DatabaseService } from '../../shared/database.service'

@Component(
{
    templateUrl: './latestChapters.component.html'
})
export class LatestChaptersComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    chapters: Chapter[]
    novels: {[id: string]: Novel}

    constructor(private db: DatabaseService, private route: ActivatedRoute) {}

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
        const newUpdates = await this.db.getUpdatesAfter(lastDate, this.NumberOfUpdates)
        this.chapters = [...this.chapters, ...newUpdates]
    }
}
