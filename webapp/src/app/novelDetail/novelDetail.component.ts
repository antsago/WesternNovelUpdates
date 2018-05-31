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
        private route: ActivatedRoute) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
        this.chapters = this.route.snapshot.data['chapters']
    }
}
