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

    ngOnInit()
    {
        this.db.getUpdates(this.NumberOfUpdates).subscribe(updates =>
        {
            this.updates = updates
        })
    }

    getMoreUpdates()
    {
        const lastDate = this.updates[this.updates.length - 1]['publicationDate']

        this.db.getUpdatesAfter(lastDate, this.NumberOfUpdates).subscribe(newUpdates =>
        {
            this.updates = [...this.updates, ...newUpdates]
        })
    }
}
