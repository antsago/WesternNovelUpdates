import { Component } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService } from './utilities/authentication.service'

@Component(
{
    templateUrl: './loginOrRegister.component.html'
})
export class LoginOrRegisterComponent
{
    public loginForm =
    {
        email: '',
        password: '',
        errorMessage: '',
        alertClosed: true
    }
    public registerForm =
    {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
        alertClosed: true
    }

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService) {}

    async login()
    {
        try
        {
            await this.auth.login(this.loginForm.email, this.loginForm.password)
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.showErrorMessage(err.message, this.loginForm)
        }
    }

    async sendPasswordResetEmail()
    {
        try
        {
            await this.auth.sendPasswordResetEmail(this.loginForm.email)
            this.showErrorMessage('We sent you the email. Reset your password and try to login again.', this.loginForm)
        }
        catch (err)
        {
            this.showErrorMessage(err.message, this.loginForm)
        }
    }

    async register()
    {
        try
        {
            await this.auth.register(this.registerForm.username, this.registerForm.email, this.registerForm.password)
            this.activeModal.close('Registered')
        }
        catch (err)
        {
            this.showErrorMessage(err.message, this.registerForm)
        }
    }

    private showErrorMessage(message, form)
    {
        form.alertClosed = false
        form.errorMessage = message
    }
}
