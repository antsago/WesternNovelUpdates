import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as fb from 'firebase'

import { LoginOrRegisterComponent } from './loginOrRegister.component'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    public isNavbarCollapsed = true
    public isLoggedIn = false
    public user

    constructor(private modalService: NgbModal)
    {
        fb.auth().onAuthStateChanged( user =>
        {
            this.user = user
            if (user != null)
            {
                this.isLoggedIn = true
            }
            else
            {
                this.isLoggedIn = false
            }
        })
    }

    loginOrRegister()
    {
        const modalRef = this.modalService.open(LoginOrRegisterComponent);
    }

    logout()
    {
        fb.auth().signOut()
    }
}

