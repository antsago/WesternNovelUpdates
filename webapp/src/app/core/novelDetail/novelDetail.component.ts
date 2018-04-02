import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Novel, ReadingListService, LoginService, List } from '../../shared/shared.module'

@Component(
{
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    private novel: Novel

    constructor(private read: ReadingListService, private route: ActivatedRoute,
        private login: LoginService) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async markAllChaptersRead()
    {
        if (this.login.isLoggedIn)
        {
            if (!this.savedInList())
            {
                await this.saveToList(this.read.getDefaultList())
            }
            await this.read.markChaptersAsRead(this.novel.chapters.map(ch => ch.guid))
        }
        else
        {
            await this.login.login()
        }
    }

    async markAllChaptersUnRead()
    {
        await this.read.markChaptersAsUnread(this.novel.chapters.map(ch => ch.guid))
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.read.readChapters.includes(ch.guid))
    }

    async saveToList(list: List)
    {
        const novel = { novelId: this.novel.id, novelTitle: this.novel.title }
        await this.read.addNovelsToList([novel], list)
    }

    savedInList(): boolean
    {
        return this.read.novelIsInList(this.novel.id)
    }

    async moveToList(list: List)
    {
        const novel = { novelId: this.novel.id, novelTitle: this.novel.title }
        await this.read.moveNovel(novel, this.read.novelWithList(this.novel.id), list)
    }
}
