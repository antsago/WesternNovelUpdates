import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ReadingListService } from '../utilities/readingList.service'
import { Novel } from '../utilities/Interfaces'
import { LoginService } from '../utilities/login.service'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel: Novel

    constructor(private read: ReadingListService, private route: ActivatedRoute,
        private login: LoginService) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async markAllChaptersRead()
    {
        if (await this.login.userWantsToLogin())
        {
            await this.read.markChaptersAsRead(this.novel.chapters.map(ch => ch.guid))
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
}
