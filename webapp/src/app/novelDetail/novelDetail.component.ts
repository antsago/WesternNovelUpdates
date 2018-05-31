import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ListsService, UserService, MessageService } from '@app/core'
import { Novel, Chapter, List, ListNovel } from 'wnu-shared'

@Component(
{
    template: `
        <div class="jumbotron my-3 p-3 p-md-5 text-white rounded light-wnubg">
            <wnu-NovelHeader [novel]="novel">
            </wnu-NovelHeader>

            <wnu-NovelSynopsis class="mt-5" [novel]="novel">
            </wnu-NovelSynopsis>

            <wnu-NovelChapters class="mt-5" [novel]="novel" [chapters]="chapters">
            </wnu-NovelChapters>
        </div>`
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
