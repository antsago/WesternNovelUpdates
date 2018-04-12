import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AuthenticationService } from './authentication.service'
import { User } from 'firebase'

@Injectable()
export class LoginService
{
    public isLoggedIn = false
    public user: User

    constructor(private auth: AuthenticationService, private modal: NgbModal)
    {
        auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            this.isLoggedIn = isLoggedIn
            this.user = user
        })
    }

    public async login(): Promise<boolean>
    {
        try
        {
            await this.modal.open(LoginOrRegisterComponent, {centered: true}).result
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
    }
}
