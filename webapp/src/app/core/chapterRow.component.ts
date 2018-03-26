import { Component, Input } from '@angular/core'
import { Chapter } from '../utilities/Interfaces'
import { ReadingListService } from '../utilities/readingList.service'
import { LoginService } from '../utilities/login.service'

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
        if (await this.login.userWantsToLogin())
        {
            await this.read.markChaptersAsRead([chapterGuid])
        }
    }

    async markAsUnread(chapterGuid: string)
    {
        await this.read.markChaptersAsUnread([chapterGuid])
    }
}
