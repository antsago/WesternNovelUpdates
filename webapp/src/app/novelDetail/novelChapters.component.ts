import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Novel, Chapter } from 'wnu-firebase'

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

    async markAsRead(chapters: Chapter[])
    {
        this.markedAsRead.emit(chapters)
    }

    async markAsUnread(chapters: Chapter[])
    {
        this.markedAsUnread.emit(chapters)
    }

    async markAllChaptersRead()
    {
        this.markAsRead(this.novel.chapters)
    }

    async markAllChaptersUnRead()
    {
        this.markAsUnread(this.novel.chapters)
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.readChapters.includes(ch.guid))
    }
}
