import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Novel, ListsService, LoginService, List,
    ListNovel, AlertService, Chapter, ReadChaptersService } from '@app/core'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    public novel: Novel

    constructor(public read: ReadChaptersService, public lists: ListsService,
        private route: ActivatedRoute, public login: LoginService,
        private as: AlertService) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async markAsRead(chapters: Chapter[])
    {
        if (this.login.isLoggedIn)
        {
            if (!this.savedInList())
            {
                const novel = { novelId: this.novel.id, novelTitle: this.novel.title }
                await this.lists.addNovelsToList([novel], this.lists.getDefaultList())
                const message = `Novel ${this.novel.title} added to "${this.lists.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
            }
            await this.read.markChaptersAsRead(chapters.map(ch => ch.guid))
        }
        else
        {
            await this.login.login()
        }
    }

    async markAsUnread(chapters: Chapter[])
    {
        await this.read.markChaptersAsUnread(chapters.map(ch => ch.guid))
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
