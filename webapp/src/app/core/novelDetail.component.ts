import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'
import { ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../user.service'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel = {}

    constructor(private db: DatabaseService, public us: UserService,
        private activatedRoute: ActivatedRoute) {}

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(async (params: Params) =>
        {
            this.novel = await this.db.getNovel(params['id'])
        })
    }
}
