import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AuthenticationService } from './utilities/authentication.service';

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    public isNavbarCollapsed = true

    constructor(private modalService: NgbModal, public auth: AuthenticationService) {}

    loginOrRegister()
    {
        this.modalService.open(LoginOrRegisterComponent)
    }

    async logout()
    {
        await this.auth.logout()
    }
}

