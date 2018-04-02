import { Component, Input } from '@angular/core'
import { Chapter, LoginService, ReadingListService, AlertService } from '../shared/shared.module'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() showNovelTitle: boolean
    @Input() markReadOnLink: boolean
    @Input() chapter: Chapter
    @Input() novelTitle: string

    constructor(private login: LoginService, private read: ReadingListService, private as: AlertService) {}

    async markAsRead()
    {
        if (this.login.isLoggedIn)
        {
            if (!this.read.novelIsInList(this.chapter.novel))
            {
                const novel = { novelId: this.chapter.novel, novelTitle: this.novelTitle }
                await this.read.addNovelsToList([novel], this.read.getDefaultList())
                const message = `Novel ${this.novelTitle} added to "${this.read.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
            }
            await this.read.markChaptersAsRead([this.chapter.guid])
        }
        else
        {
            await this.login.login()
        }
    }

    async markAsUnread()
    {
        await this.read.markChaptersAsUnread([this.chapter.guid])
    }

    async openedChapterLink()
    {
        if (this.markReadOnLink)
        {
            await this.markAsRead()
        }
    }
}
