import { Component, Input } from '@angular/core'
import { AuthenticationService } from '../utilities/authentication.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { Chapter, Novel } from '../utilities/Interfaces'
import { ReadingListService } from '../utilities/readingList.service'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() chapter: Chapter
    @Input() novelTitle: string

    constructor(public auth: AuthenticationService, private modalService: NgbModal,
        private read: ReadingListService) {}

    async markAsRead(chapterGuid: string)
    {
        if (!this.auth.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.read.markChaptersAsRead([chapterGuid])
    }

    async markAsUnread(chapterGuid: string)
    {
        await this.read.markChaptersAsUnread([chapterGuid])
    }
}
