import { Component, OnInit } from '@angular/core'
import { DatabaseService } from './database.service'

@Component(
{
    templateUrl: './latestUpdates.component.html'
})
export class LatestUpdatesComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    updates: {}[]

    constructor(private db: DatabaseService) {}

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
