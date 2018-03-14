import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'
import { UserService } from '../user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'

@Component(
{
    templateUrl: './latestUpdates.component.html'
})
export class LatestUpdatesComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    updates: firebase.firestore.DocumentData[]

    constructor(private db: DatabaseService, private us: UserService,
        private modalService: NgbModal) {}

    async ngOnInit()
    {
        this.updates = await this.db.getUpdates(this.NumberOfUpdates)
    }

    async getMoreUpdates()
    {
        const lastDate = this.updates[this.updates.length - 1]['publicationDate']
        const newUpdates = await this.db.getUpdatesAfter(lastDate, this.NumberOfUpdates)
        this.updates = [...this.updates, ...newUpdates]
    }

    async markAsRead(chapterGuid)
    {
        if (!this.us.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.us.markChapterAsRead(chapterGuid)
    }

    async markAsUnread(chapterGuid)
    {
        await this.us.markChapterAsUnread(chapterGuid)
    }
}
