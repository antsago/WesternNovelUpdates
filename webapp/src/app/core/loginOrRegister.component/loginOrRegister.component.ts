import { Component, ViewChild } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService, DatabaseService } from 'wnu-shared'
import { AlertComponent } from '@app/shared'
import { GoogleAnalyticsService } from '../googleAnalytics.service'

const INITIAL_LIST =
{
    listId: null,
    listName: 'Reading',
    novels: []
}

@Component(
{
    templateUrl: './loginOrRegister.component.html'
})
export class LoginOrRegisterComponent
{
    @ViewChild('loginAlert')
    private loginAlert: AlertComponent
    @ViewChild('registerAlert')
    private registerAlert: AlertComponent

    public loginForm =
    {
        email: '',
        password: '',
    }
    public registerForm =
    {
        username: '',
        email: '',
        password: '',
    }

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
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
            this.loginAlert.showMessage(err.message)
        }
    }

    async sendPasswordResetEmail()
    {
        try
        {
            await this.auth.sendPasswordResetEmail(this.loginForm.email)
            this.ga.emitEvent('reset password', 'Authentication')
            this.loginAlert.showMessage('We sent you the email. Reset your password and try to login again.')
        }
        catch (err)
        {
            this.loginAlert.showMessage(err.message)
        }
    }

    async register()
    {
        try
        {
            await this.createUser(this.registerForm.username, this.registerForm.email, this.registerForm.password)
            this.ga.emitEvent('register', 'Authentication')
            this.activeModal.close('Registered')
        }
        catch (err)
        {
            this.registerAlert.showMessage(err.message)
        }
    }

    private async createUser(username, email, password)
    {
        await this.auth.register(username, email, password)

        const userId = this.auth.currentUser().uid
        await this.db.users.create(userId)
        const defaultList = await this.db.users.lists(userId).add(INITIAL_LIST)
        await this.db.users.setDefaultList(userId, defaultList)
    }
}
