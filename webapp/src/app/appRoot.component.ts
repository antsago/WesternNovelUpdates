import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { UserService } from './utilities/user.service';

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
        this.modalService.open(LoginOrRegisterComponent)
    }

    async logout()
    {
        await this.us.logout()
    }
}

