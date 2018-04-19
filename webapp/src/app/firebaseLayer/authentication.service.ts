import { Injectable } from '@angular/core'
import { auth, User } from 'firebase'

@Injectable()
export class AuthenticationService
{
    constructor(private readonly fba: auth.Auth){}
    public async callOnAuthStateChanged(functionToCall: (isLoggedIn: boolean, user: User) => any): Promise<void>
    {
        this.fba.onAuthStateChanged(user => functionToCall(user != null, user))
    }

    public async register(username: string, email: string, password: string)
    {
        await this.fba.createUserWithEmailAndPassword(email, password)
        await this.fba.currentUser.updateProfile(
        {
            displayName: username,
            photoURL: null
        })
    }

    public async login(email: string, password: string)
    {
        await this.fba.signInWithEmailAndPassword(email, password)
    }

    public async logout()
    {
        await this.fba.signOut()
    }

    public async sendPasswordResetEmail(email: string)
    {
        await this.fba.sendPasswordResetEmail(email)
    }
}
