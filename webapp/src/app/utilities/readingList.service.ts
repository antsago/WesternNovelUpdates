import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import * as fb from 'firebase'
import { Router } from '@angular/router'
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReadingListService
{
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private auth: AuthenticationService)
    {
        fb.auth().onAuthStateChanged(async user =>
        {
            if (this.auth.isLoggedIn)
            {
                this.readChapters = (await this.db.getUser(this.auth.user.uid)).readChapters
            }
            else
            {
                this.readChapters = [] as string[]
            }
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[])
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await this.db.setUser(this.auth.user.uid, {readChapters: this.readChapters})
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await this.db.setUser(this.auth.user.uid, { readChapters: this.readChapters })
    }
}
