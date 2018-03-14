import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'
import { ActivatedRoute, Params } from '@angular/router'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel = {}

    constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(async (params: Params) =>
        {
            this.novel = await this.db.getNovel(params['id'])
        })
    }
}
