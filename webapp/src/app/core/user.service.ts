import { Injectable, EventEmitter } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as fb from 'firebase'
import { User, AuthenticationService, DatabaseService } from 'wnu-shared'
import { LoginOrRegisterComponent } from './loginOrRegister.component/loginOrRegister.component'
import { GoogleAnalyticsService } from './googleAnalytics.service'
import { ProfileComponent } from './profile.component/profile.component'

@Injectable()
export class UserService
{
    private loginSubscribers = []
    isLoggedIn: boolean
    fbUser: fb.User
    wnuUser: User

    constructor(private auth: AuthenticationService, private modal: NgbModal,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
    {
        auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            this.fbUser = isLoggedIn ? user : null
            this.wnuUser = isLoggedIn ? await this.db.users.get(this.fbUser.uid) : null
            this.isLoggedIn = isLoggedIn

            this.loginSubscribers.forEach(subscriber => subscriber())
        })
    }

    async doOnLoginChange(subscriber: () => {})
    {
        this.loginSubscribers.push(subscriber)
        subscriber()
    }

    async login(): Promise<boolean>
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

    async logout()
    {
        this.ga.emitEvent('logout', 'Authentication')
        await this.auth.logout()
    }

    async viewProfile(): Promise<boolean>
    {
        try
        {
            await this.modal.open(ProfileComponent, {centered: true}).result
            return true
        }
        catch
        {
            return false
        }
    }
}
