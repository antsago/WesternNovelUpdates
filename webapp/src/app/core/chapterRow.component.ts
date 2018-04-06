import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Chapter, LoginService, ReadingListService, AlertService } from '../shared/shared.module'

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

    async markAsRead()
    {
        this.markedAsRead.emit()
    }

    async markAsUnread()
    {
        this.markedAsUnread.emit()
    }

    async openedChapterLink()
    {
        this.openLink.emit()
    }
}
