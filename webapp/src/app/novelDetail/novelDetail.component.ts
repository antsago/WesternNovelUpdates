import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Novel, ReadingListService, LoginService, List,
    ListNovel, AlertService, Chapter } from '@app/shared/shared.module'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    public novel: Novel

    constructor(private read: ReadingListService, private route: ActivatedRoute,
        private login: LoginService, private as: AlertService) {}

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
                const message = `Novel ${this.novel.title} added to "${this.read.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
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

    async markAsRead(chapter: Chapter, novelTitle: string)
    {
        if (this.login.isLoggedIn)
        {
            if (!this.read.novelIsInList(chapter.novel))
            {
                const novel = { novelId: chapter.novel, novelTitle: novelTitle }
                await this.read.addNovelsToList([novel], this.read.getDefaultList())
                const message = `Novel ${novelTitle} added to "${this.read.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
            }
            await this.read.markChaptersAsRead([chapter.guid])
        }
        else
        {
            await this.login.login()
        }
    }

    async markAsUnread(chapter: Chapter)
    {
        await this.read.markChaptersAsUnread([chapter.guid])
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.read.readChapters.includes(ch.guid))
    }

    async saveToList(list: List)
    {
        if (this.login.isLoggedIn)
        {
            await this.read.addNovelsToList([this.getListNovel()], list)
        }
        else
        {
            await this.login.login()
        }
    }

    savedInList(): boolean
    {
        return this.read.novelIsInList(this.novel.id)
    }

    async moveToList(list: List)
    {
        await this.read.moveNovel(this.getListNovel(), this.read.novelWithList(this.novel.id), list)
    }

    async deleteFromList()
    {
        await this.read.deleteNovelFromList(this.getListNovel(), this.read.novelWithList(this.novel.id))
    }

    private getListNovel(): ListNovel
    {
        return { novelId: this.novel.id, novelTitle: this.novel.title }
    }
}
