import { Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { AuthenticationService } from './user/authentication.service'

@Injectable()
export class ReadChaptersService
{
    private userId: string
    public readChapters = [] as string[]

    constructor(private db: DatabaseService, private auth: AuthenticationService)
    {
        this.auth.callOnAuthStateChanged(async (isLoggedIn, user) =>
        {
            if (isLoggedIn)
            {
                try
                {
                    this.userId = user.uid
                    this.readChapters = await this.db.getReadChapters(this.userId)
                }
                catch (err) // user object doesn't exists
                {
                    this.readChapters = []
                }
            }
            else
            {
                this.userId = null
                this.readChapters = []
            }
        })
    }

    public async markChaptersAsRead(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.concat(chaptersGUID)
        await Promise.all(chaptersGUID.map(chapterId => this.db.addReadChapter(this.userId, chapterId)))
    }

    public async markChaptersAsUnread(chaptersGUID: string[]): Promise<void>
    {
        this.readChapters = this.readChapters.filter(chapter => !chaptersGUID.includes(chapter))
        await Promise.all(chaptersGUID.map(chapterId => this.db.removeReadChapter(this.userId, chapterId)))
    }
}
