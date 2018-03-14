import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'

@Component(
{
    templateUrl: './novels.component.html'
})
export class NovelsComponent implements OnInit
{
    novels: {}[]

    constructor(private db: DatabaseService) {}

    async ngOnInit()
    {
        this.novels = await this.db.getNovels()
    }
}
