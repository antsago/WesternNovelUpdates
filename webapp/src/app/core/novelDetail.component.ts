import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../utilities/database.service'
import { ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../utilities/user.service'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Novel } from '../utilities/Interfaces'

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel: Novel

    constructor(private db: DatabaseService, public us: UserService,
        private route: ActivatedRoute, private modalService: NgbModal) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async markAllChaptersRead()
    {
        if (!this.us.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.us.markChaptersAsRead(this.novel.chapters.map(ch => ch.guid))
    }

    async markAllChaptersUnRead()
    {
        await this.us.markChaptersAsUnread(this.novel.chapters.map(ch => ch.guid))
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.us.readChapters.includes(ch.guid))
    }
}
