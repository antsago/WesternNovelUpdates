import { Component, Input } from '@angular/core'
import { Chapter, LoginService, ReadingListService } from '../shared/shared.module'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() chapter: Chapter
    @Input() novelTitle: string

    constructor(private login: LoginService, private read: ReadingListService) {}

    async markAsRead(chapterGuid: string)
    {
        if (this.login.isLoggedIn)
        {
            await this.read.markChaptersAsRead([chapterGuid])
        }
        else
        {
            await this.login.login()
        }
    }

    async markAsUnread(chapterGuid: string)
    {
        await this.read.markChaptersAsUnread([chapterGuid])
    }
}
