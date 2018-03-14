import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../database.service'
import { ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../user.service'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel = {}

    constructor(private db: DatabaseService, public us: UserService,
        private activatedRoute: ActivatedRoute, private modalService: NgbModal) {}

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(async (params: Params) =>
        {
            this.novel = await this.db.getNovel(params['id'])
        })
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
