import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Chapter, ChapterState } from 'wnu-shared'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() chapter: Chapter
    @Input() novelTitle: string
    @Input() chapterState: ChapterState
    @Input() showNovelTitle: boolean

    @Output() setBookmark = new EventEmitter<void>()
    @Output() removeBookmark = new EventEmitter<void>()
    @Output() openLink = new EventEmitter<void>()

    bookmark()
    {
        this.setBookmark.emit()
    }

    unbookmark()
    {
        this.removeBookmark.emit()
    }

    openedChapterLink()
    {
        console.log(this.chapterState)
        this.openLink.emit()
    }
}
