import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import * as fb from 'firebase'
import { Router } from '@angular/router'

@Injectable()
export class UserService
{
    public user: fb.User
    public isLoggedIn = false
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private router: Router)
    {
        fb.auth().onAuthStateChanged(async user =>
        {
            this.user = user
            this.isLoggedIn = this.user != null

            if (this.isLoggedIn)
            {
                this.readChapters = (await this.db.getUser(this.user.uid)).readChapters
            }
            else
            {
                this.readChapters = [] as string[]
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

    public async markChaptersAsRead(chaptersGUID: string[])
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await this.db.setUser(this.user.uid, {readChapters: this.readChapters})
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await this.db.setUser(this.user.uid, { readChapters: this.readChapters })
    }
}
