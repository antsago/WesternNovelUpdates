import { Component, Input, EventEmitter, Output } from '@angular/core'
import { ChapterState } from 'wnu-shared'

@Component(
{
    selector: 'wnu-bookmark',
    templateUrl: 'bookmark.component.html'
})
export class BookmarkComponent
{
    @Input() state: ChapterState

    @Output() setBookmark = new EventEmitter<void>()
    @Output() removeBookmark = new EventEmitter<void>()

    onClick()
    {
        if (this.state === 'Bookmarked')
        {
            this.removeBookmark.emit()
        }
        else
        {
            this.setBookmark.emit()
        }
    }
}
