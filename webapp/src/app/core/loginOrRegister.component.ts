import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

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

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open login form', 'Authentication')
    }

    async login()
    {
        try
        {
            await this.auth.login(this.loginForm.email, this.loginForm.password)
            this.ga.emitEvent('login', 'Authentication')
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
            this.ga.emitEvent('reset password', 'Authentication')
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
            this.ga.emitEvent('register', 'Authentication')
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
