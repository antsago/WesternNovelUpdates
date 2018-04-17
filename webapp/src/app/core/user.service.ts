import { Injectable, EventEmitter } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as fb from 'firebase'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AuthenticationService } from './authentication.service'
import { User } from './Interfaces'
import { DatabaseService } from './database.service'

const INITIAL_LIST =
{
    listId: null,
    listName: 'Reading',
    novels: []
}

@Injectable()
export class UserService
{
    private loginSubscribers = []
    isLoggedIn: boolean
    fbUser: fb.User
    wnuUser: User

    constructor(private auth: AuthenticationService, private modal: NgbModal, private db: DatabaseService)
    {
        auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            this.fbUser = isLoggedIn ? user : null
            this.wnuUser = isLoggedIn ? await this.getOrCreateWnuUser(this.fbUser.uid) : null
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
        await this.auth.logout()
    }

    private async getOrCreateWnuUser(userId: string): Promise<User>
    {
        try
        {
            return await this.db.users.get(userId)
        }
        catch (err) // user object doesn't exists
        {
            await this.db.users.create(userId)
            const defaultList = await this.db.users.lists(userId).add(INITIAL_LIST)
            await this.db.users.setDefaultList(userId, defaultList)

            return { defaultList: defaultList }
        }
    }
}
