import { Component, Input, OnInit } from '@angular/core'
import { LoginService, ReadingListService, Chapter, ListNovel, DatabaseService } from '../../shared/shared.module'

@Component(
{
    selector: 'wnu-listnovel',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './novelList.component.html'
})
export class NovelListComponent implements OnInit
{
    @Input() novel: ListNovel
    private novelCollapsed = true
    private chapters = [] as Chapter[]

    constructor(private read: ReadingListService, private db: DatabaseService){}

    async ngOnInit()
    {
        this.chapters = await this.db.getNovelChapters(this.novel.novelId)
    }

    async markAllChaptersRead()
    {
        await this.read.markChaptersAsRead(this.chapters.map(ch => ch.guid))
    }

    async markAllChaptersUnread()
    {
        await this.read.markChaptersAsUnread(this.chapters.map(ch => ch.guid))
    }

    areAllChaptersRead()
    {
        return this.chapters.every(ch => this.read.readChapters.includes(ch.guid))
    }
}


