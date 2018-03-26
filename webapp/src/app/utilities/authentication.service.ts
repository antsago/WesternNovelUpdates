import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'

@Injectable()
export class AuthenticationService
{
    public user: fb.User
    public isLoggedIn = false
    private onAuthStateChanged = [] as ((AuthenticationService) => (void | Promise<void>))[]

    constructor(private router: Router, private modal: NgbModal)
    {
        this.doOnAuthStateChanged()
    }

    public async callOnAuthStateChanged(onAuthChanged: (auth: AuthenticationService) => any): Promise<void>
    {
        this.onAuthStateChanged.push(onAuthChanged)
        await onAuthChanged(this)
    }

    public async register(username: string, email: string, password: string)
    {
        await fb.auth().createUserWithEmailAndPassword(email, password)
        await fb.auth().currentUser.updateProfile(
        {
            displayName: username,
            photoURL: null
        })
        await this.doOnAuthStateChanged()
    }

    public async login(email: string, password: string)
    {
        await fb.auth().signInWithEmailAndPassword(email, password)
        await this.doOnAuthStateChanged()
    }

    public async logout()
    {
        await fb.auth().signOut()
        await this.doOnAuthStateChanged()
        if (this.router.url === '/readingLists')
        {
            this.router.navigateByUrl('')
        }
    }

    public async sendPasswordResetEmail(email: string)
    {
        await fb.auth().sendPasswordResetEmail(email)
    }

    private async doOnAuthStateChanged()
    {
        this.user = fb.auth().currentUser
        this.isLoggedIn = this.user != null
        await Promise.all(this.onAuthStateChanged.map(call => call(this)))
    }
}
