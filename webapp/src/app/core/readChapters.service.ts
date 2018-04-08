import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './user/authentication.service'
import { LoginService } from './user/login.service'


@Injectable()
export class ReadChaptersService
{
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private auth: AuthenticationService, private login: LoginService)
    {
        this.auth.callOnAuthStateChanged(async () =>
        {
            try
            {
                this.readChapters = this.login.isLoggedIn ? await this.db.getReadChapters(this.login.user.uid) : []
            }
            catch (err) // user object doesn't exists
            {
                this.readChapters = []
            }
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await Promise.all(chaptersGUID.map(chapterId => this.db.addReadChapter(this.login.user.uid, chapterId)))
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await Promise.all(chaptersGUID.map(chapterId => this.db.removeReadChapter(this.login.user.uid, chapterId)))
    }
}
