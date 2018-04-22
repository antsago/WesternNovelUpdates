import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Chapter } from 'wnu-shared'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() chapter: Chapter
    @Input() novelTitle: string
    @Input() chapterRead: boolean
    @Input() showNovelTitle: boolean

    @Output() markedAsRead = new EventEmitter<void>()
    @Output() markedAsUnread = new EventEmitter<void>()
    @Output() openLink = new EventEmitter<void>()

    markAsRead()
    {
        this.markedAsRead.emit()
    }

    markAsUnread()
    {
        this.markedAsUnread.emit()
    }

    openedChapterLink()
    {
        this.openLink.emit()
    }
}
