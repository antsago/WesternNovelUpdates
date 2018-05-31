import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ListsService, UserService, MessageService } from '@app/core'
import { Novel, Chapter, List, ListNovel } from 'wnu-shared'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    public novel: Novel
    public chapters: Chapter[]

    constructor(public lists: ListsService,
        private route: ActivatedRoute, public login: UserService,
        private as: MessageService) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
        this.chapters = this.route.snapshot.data['chapters']
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
