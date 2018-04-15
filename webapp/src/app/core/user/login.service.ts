import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as fb from 'firebase'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AuthenticationService } from './authentication.service'
import { User } from '../Interfaces'
import { DatabaseService } from '../database.service'

@Injectable()
export class LoginService
{
    public isLoggedIn = false
    public fbUser: fb.User
    public wnuUser: User

    constructor(private auth: AuthenticationService, private modal: NgbModal, private db: DatabaseService)
    {
        auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            this.fbUser = isLoggedIn ? user : null
            this.wnuUser = isLoggedIn ? await this.db.getUser(this.fbUser.uid) : null
            this.isLoggedIn = isLoggedIn
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
