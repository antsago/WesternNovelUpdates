import { Component, Input, OnInit } from '@angular/core'
import { UserService, ListsService, BookmarkService, GoogleAnalyticsService } from '@app/core'
import { List, ListNovel, Chapter, DatabaseService } from 'wnu-shared'

@Component(
{
    selector: 'wnu-listnovel',
    templateUrl: './novelList.component.html'
})
export class NovelListComponent implements OnInit
{
    @Input() list: List
    @Input() novel: ListNovel
    public chapters = [] as Chapter[]
    public buildChapters = false
    public novelCollapsed = true

    constructor(public lists: ListsService, public read: BookmarkService,
        private db: DatabaseService, public ga: GoogleAnalyticsService) {}

    async ngOnInit()
    {
        this.chapters = await this.db.chapters.getAllNovelChapters(this.novel.novelId)
    }

    noUnreadChapters()
    {
        return this.chapters.filter(ch => this.read.chapterState(ch) === 'Unread').length
    }

    async deleteNovel()
    {
        await this.lists.deleteNovelFromList(this.novel, this.list)
    }

    async moveToList(list: List)
    {
        await this.lists.moveNovel(this.novel, this.list, list)
    }
}


