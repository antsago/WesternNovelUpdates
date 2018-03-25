import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import { Router } from '@angular/router'

@Injectable()
export class AuthenticationService
{
    public user: fb.User
    public isLoggedIn = false

    constructor(private router: Router)
    {
        fb.auth().onAuthStateChanged(async user =>
        {
            this.user = user
            this.isLoggedIn = this.user != null
        })
    }

    public async login(email: string, password: string)
    {
        await fb.auth().signInWithEmailAndPassword(email, password)
    }

    public async logout()
    {
        await fb.auth().signOut()
        if (this.router.url === '/readingLists')
        {
            this.router.navigateByUrl('')
        }
    }

    public async sendPasswordResetEmail(email: string)
    {
        await fb.auth().sendPasswordResetEmail(email)
    }

    public async register(username: string, email: string, password: string)
    {
        await fb.auth().createUserWithEmailAndPassword(email, password)
        await fb.auth().currentUser.updateProfile(
        {
            displayName: username,
            photoURL: null
        })
    }
}
