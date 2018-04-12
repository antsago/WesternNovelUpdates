import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginService } from '@app/core'
import { AddNovelComponent } from './addNovel.component'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    public isNavbarCollapsed = true

    constructor(public login: LoginService, private modal: NgbModal) {}

    loginOrRegister()
    {
        this.login.login()
    }

    logout()
    {
        this.login.logout()
    }

    addNovel()
    {
        this.modal.open(AddNovelComponent, {centered: true})
    }
}

