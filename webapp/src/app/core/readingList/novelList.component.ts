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
    public chapters = [] as Chapter[]

    public novelCollapsed = true

    constructor(public read: ReadingListService, private db: DatabaseService) {}

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

    async markChapterAsRead(chapter: Chapter, novelTitle: string)
    {
        await this.read.markChaptersAsRead([chapter.guid])
    }

    async markChapterAsUnread(chapter: Chapter)
    {
        await this.read.markChaptersAsUnread([chapter.guid])
    }
}


