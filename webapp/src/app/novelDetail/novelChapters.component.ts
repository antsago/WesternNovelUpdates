import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Novel, Chapter } from 'wnu-shared'

@Component(
{
    selector: 'wnu-NovelChapters',
    templateUrl: './novelChapters.component.html'
})
export class NovelChaptersComponent
{
    @Input() novel: Novel
    @Input() readChapters: string[]

    @Output() markedAsRead = new EventEmitter<Chapter[]>()
    @Output() markedAsUnread = new EventEmitter<Chapter[]>()
    @Output() openLink = new EventEmitter<void>()
    @Output() moreChapters = new EventEmitter<void>()

    markAsRead(chapters: Chapter[])
    {
        this.markedAsRead.emit(chapters)
    }

    markAsUnread(chapters: Chapter[])
    {
        this.markedAsUnread.emit(chapters)
    }

    markAllChaptersRead()
    {
        this.markAsRead(this.novel.chapters)
    }

    markAllChaptersUnRead()
    {
        this.markAsUnread(this.novel.chapters)
    }

    linkClicked()
    {
        this.openLink.emit()
    }

    getMoreChapters()
    {
        this.moreChapters.emit()
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.readChapters.includes(ch.guid))
    }
}
