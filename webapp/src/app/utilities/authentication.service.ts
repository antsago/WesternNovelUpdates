import { Injectable } from '@angular/core'
import * as fb from 'firebase'

@Injectable()
export class AuthenticationService
{
    public async callOnAuthStateChanged(functionToCall: (user: fb.User) => any): Promise<void>
    {
        fb.auth().onAuthStateChanged(functionToCall)
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
}
