import { Component, Input, EventEmitter, Output } from '@angular/core'
import { BookmarkService } from '@app/core'
import { Novel, Chapter } from 'wnu-shared'

@Component(
{
    selector: 'wnu-NovelChapters',
    templateUrl: './novelChapters.component.html'
})
export class NovelChaptersComponent
{
    @Input() novel: Novel
    @Input() chapters: Chapter[]
    @Output() openLink = new EventEmitter<void>()
    @Output() moreChapters = new EventEmitter<void>()

    constructor(public read: BookmarkService){}

    linkClicked()
    {
        this.openLink.emit()
    }

    getMoreChapters()
    {
        this.moreChapters.emit()
    }
}
