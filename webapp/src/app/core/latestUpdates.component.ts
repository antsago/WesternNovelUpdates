import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'
import { UserService } from '../user.service';

@Component(
{
    templateUrl: './latestUpdates.component.html'
})
export class LatestUpdatesComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    updates: firebase.firestore.DocumentData[]

    constructor(private db: DatabaseService, private us: UserService) {}

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
}
