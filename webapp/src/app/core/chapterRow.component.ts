import { Component, Input } from '@angular/core'
import { UserService } from '../utilities/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { Chapter, Novel } from '../utilities/Interfaces'

@Component(
{
    selector: 'wnu-chapter',
    templateUrl: './chapterRow.component.html'
})
export class ChapterRowComponent
{
    @Input() chapter: Chapter
    @Input() novelTitle: string

    constructor(private us: UserService, private modalService: NgbModal) {}

    async markAsRead(chapterGuid: string)
    {
        if (!this.us.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.us.markChaptersAsRead([chapterGuid])
    }

    async markAsUnread(chapterGuid: string)
    {
        await this.us.markChaptersAsUnread([chapterGuid])
    }
}
