import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { UserService } from './user.service';

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    public isNavbarCollapsed = true

    constructor(private modalService: NgbModal, public us: UserService) {}

    loginOrRegister()
    {
        const modalRef = this.modalService.open(LoginOrRegisterComponent);
    }

    async logout()
    {
        await this.us.logout()
    }
}

