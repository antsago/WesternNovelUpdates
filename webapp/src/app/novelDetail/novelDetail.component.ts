import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ListsService, UserService, MessageService,
    BookmarkService, GoogleAnalyticsService } from '@app/core'
import { Novel, Chapter, List, ListNovel, DatabaseService } from 'wnu-shared'

const ChapterAddRate = 10

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    public novel: Novel

    constructor(public lists: ListsService,
        private route: ActivatedRoute, public login: UserService,
        private as: MessageService, public ga: GoogleAnalyticsService,
        private db: DatabaseService) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async getMoreChapters()
    {
        const lastDate = this.novel.chapters[this.novel.chapters.length - 1]['publicationDate']
        const newUpdates = await this.db.chapters.getNovelChaptersAfter(this.novel.id, lastDate, ChapterAddRate)
        this.novel.chapters = [...this.novel.chapters, ...newUpdates]

        this.ga.emitEvent('get more novel chaters', 'Reading')
    }

    savedInList(): boolean
    {
        return this.lists.novelIsInList(this.novel.id)
    }

    async saveToList(list: List)
    {
        if (this.login.isLoggedIn)
        {
            await this.lists.addNovelsToList([this.getListNovel()], list)
        }
        else
        {
            await this.login.login()
        }
    }

    async moveToList(list: List)
    {
        await this.lists.moveNovel(this.getListNovel(), this.lists.novelWithList(this.novel.id), list)
    }

    async deleteFromList()
    {
        await this.lists.deleteNovelFromList(this.getListNovel(), this.lists.novelWithList(this.novel.id))
    }

    private getListNovel(): ListNovel
    {
        return { novelId: this.novel.id, novelTitle: this.novel.title }
    }
}
