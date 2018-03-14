import { Injectable } from '@angular/core'
import * as fb from 'firebase'

@Injectable()
export class UserService
{
    public user: fb.User
    public isLoggedIn = false

    constructor()
    {
        fb.auth().onAuthStateChanged( user =>
        {
            this.user = user
            if (user != null)
            {
                this.isLoggedIn = true
            }
            else
            {
                this.isLoggedIn = false
            }
        })
    }

    public async login(email: string, password: string)
    {
        await fb.auth().signInWithEmailAndPassword(email, password)
    }

    public async logout()
    {
        await fb.auth().signOut()
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
