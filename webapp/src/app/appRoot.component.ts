import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from '@app/core'
import { AddNovelComponent, ViewNovelRequestsComponent } from '@app/novelRequests'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    constructor(public user: UserService, private modal: NgbModal) {}

    loginOrRegister()
    {
        this.user.login()
    }

    logout()
    {
        this.user.logout()
    }

    addNovel()
    {
        this.modal.open(AddNovelComponent, {centered: true})
    }

    viewNovelRequests()
    {
        this.modal.open(ViewNovelRequestsComponent, {centered: true})
    }
}

