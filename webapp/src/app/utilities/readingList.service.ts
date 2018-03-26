import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './authentication.service'
import { LoginService } from './login.service'

@Injectable()
export class ReadingListService
{
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private auth: AuthenticationService, private login: LoginService)
    {
        this.auth.callOnAuthStateChanged(async user =>
        {
            try
            {
                this.readChapters = this.login.isLoggedIn ?
                    (await this.db.getUser(this.login.user.uid)).readChapters
                    : []
            }
            catch (err)
            {
                this.readChapters = []
            }
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[])
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await this.db.setUser(this.login.user.uid, {readChapters: this.readChapters})
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await this.db.setUser(this.login.user.uid, { readChapters: this.readChapters })
    }
}
