import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class LoginService
{
    public user: fb.User
    public isLoggedIn = false

    constructor(private auth: AuthenticationService, private modal: NgbModal, private router: Router)
    {
        auth.callOnAuthStateChanged(user =>
        {
            this.user = user
            this.isLoggedIn = this.user != null
        })
    }

    public async login(): Promise<boolean>
    {
        try
        {
            await this.modal.open(LoginOrRegisterComponent).result
            return true
        }
        catch
        {
            return false
        }
    }

    public async logout()
    {
        await this.auth.logout()
        if (this.router.url === '/readingLists')
        {
            this.router.navigateByUrl('')
        }
    }
}
