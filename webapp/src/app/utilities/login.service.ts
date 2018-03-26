import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class LoginService
{
    constructor(private auth: AuthenticationService, private modal: NgbModal) {}

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

    public async userWantsToLogin(): Promise<boolean>
    {
        if (!this.auth.isLoggedIn)
        {
            return await this.login()
        }
        return true
    }
}
