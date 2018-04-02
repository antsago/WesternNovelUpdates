import { Component, Input, OnInit } from '@angular/core'
import { LoginService, ReadingListService, Chapter,
    ListNovel, DatabaseService, List } from '../../shared/shared.module'

@Component(
{
    selector: 'wnu-listnovel',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './novelList.component.html'
})
export class NovelListComponent implements OnInit
{
    @Input() list: List
    @Input() novel: ListNovel
    private chapters = [] as Chapter[]

    private novelCollapsed = true

    constructor(private read: ReadingListService, private db: DatabaseService) {}

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

    noUnreadChapters()
    {
        return this.chapters.filter(ch => !this.read.readChapters.includes(ch.guid)).length
    }

    async deleteNovel()
    {
        await this.read.deleteNovelFromList(this.novel, this.list)
    }

    async moveToList(list: List)
    {
        await this.read.moveNovel(this.novel, this.list, list)
    }
}


