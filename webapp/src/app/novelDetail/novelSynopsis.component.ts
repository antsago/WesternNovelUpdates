import { Component, Input, EventEmitter, Output } from '@angular/core'
import { BookmarkService, GoogleAnalyticsService } from '@app/core'
import { Novel } from 'wnu-shared'

@Component(
{
    selector: 'wnu-NovelSynopsis',
    template: `
    <div class="d-flex flex-row justify-content-between align-items-center ">
        <strong>Synopsis</strong>
        <wnu-NovelDetailListMenu [novel]="novel">
        </wnu-NovelDetailListMenu>
    </div>

    <div class="my-3 p-3 bg-white text-dark rounded box-shadow">
        <p class="text-justify">{{novel.synopsis}}</p>
    </div>`
})
export class NovelSynopsisComponent
{
    @Input() novel: Novel
}
