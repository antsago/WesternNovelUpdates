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
    public username

    constructor(private modalService: NgbModal)
    {
        fb.auth().onAuthStateChanged( user =>
        {
            if (user != null)
            {
                this.isLoggedIn = true
                this.username = user.displayName
            }
            else
            {
                this.isLoggedIn = false
                this.username = ''
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

