import { auth, User } from 'firebase'

export class AuthenticationService
{
    currentUser: User|null 

    constructor(private readonly fba: auth.Auth)
    {
        this.fba.onAuthStateChanged(user => this.currentUser = user)
    }

    public async callOnAuthStateChanged(functionToCall: (isLoggedIn: boolean, user: User|null) => any): Promise<void>
    {
        this.fba.onAuthStateChanged(user => functionToCall(user !== null, user))
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

    public async reauthenticate(password: string)
    {
        const credential = auth.EmailAuthProvider.credential(this.currentUser.email, password)
        await this.currentUser.reauthenticateWithCredential(credential)
    }

    public async deleteUser()
    {
        await this.currentUser.delete()
    }
}
