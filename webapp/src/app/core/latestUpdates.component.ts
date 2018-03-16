import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../utilities/database.service'
import { UserService } from '../utilities/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { Chapter, Novel } from '../utilities/Interfaces'

@Component(
{
    templateUrl: './latestUpdates.component.html'
})
export class LatestUpdatesComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    updates: Chapter[]
    novels: {[id: string]: Novel}

    constructor(private db: DatabaseService, private us: UserService,
        private modalService: NgbModal) {}

    async ngOnInit()
    {
        this.updates = await this.db.getUpdates(this.NumberOfUpdates)
        const novelsArray = await this.db.getAllNovels()
        this.novels = novelsArray.reduce((map, novel) =>
        {
            map[novel.id] = novel
            return map
        }, {})
    }

    async getMoreUpdates()
    {
        const lastDate = this.updates[this.updates.length - 1]['publicationDate']
        const newUpdates = await this.db.getUpdatesAfter(lastDate, this.NumberOfUpdates)
        this.updates = [...this.updates, ...newUpdates]
    }

    async markAsRead(chapterGuid: string)
    {
        if (!this.us.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.us.markChaptersAsRead([chapterGuid])
    }

    async markAsUnread(chapterGuid: string)
    {
        await this.us.markChaptersAsUnread([chapterGuid])
    }
}
