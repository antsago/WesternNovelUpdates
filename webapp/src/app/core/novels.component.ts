import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../utilities/database.service'
import { Novel } from '../utilities/Interfaces'

@Component(
{
    templateUrl: './novels.component.html'
})
export class NovelsComponent implements OnInit
{
    novels: Novel[]

    constructor(private db: DatabaseService) {}

    async ngOnInit()
    {
        this.novels = await this.db.getNovels()
    }
}
