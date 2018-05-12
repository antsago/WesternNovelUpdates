import { auth, User } from 'firebase'

export class AuthenticationService
{
    constructor(private readonly fba: auth.Auth) {}

    public async callOnAuthStateChanged(functionToCall: (isLoggedIn: boolean, user: User|null) => any): Promise<void>
    {
        this.fba.onAuthStateChanged(user => functionToCall(user !== null, user))
    }

    public currentUser(): User|null
    {
        return this.fba.currentUser
    }

    public async register(username: string, email: string, password: string)
    {
        await this.fba.createUserWithEmailAndPassword(email, password)
        await this.setUsername(username)
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
        const credential = auth.EmailAuthProvider.credential(this.fba.currentUser.email, password)
        await this.fba.currentUser.reauthenticateWithCredential(credential)
    }

    public async deleteUser()
    {
        await this.fba.currentUser.delete()
    }

    public async setEmail(newEmail: string)
    {
        await this.fba.currentUser.updateEmail(newEmail)
    }

    public async setPassword(newPassword: string)
    {
        await this.fba.currentUser.updatePassword(newPassword)
    }

    public async setUsername(newUsername: string)
    {
        await this.fba.currentUser.updateProfile(
        {
            displayName: newUsername,
            photoURL: null
        })
    }
}
