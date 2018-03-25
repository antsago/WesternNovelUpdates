import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../utilities/database.service'
import { ActivatedRoute, Params } from '@angular/router'
import { ReadingListService } from '../utilities/readingList.service'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Novel } from '../utilities/Interfaces'
import { AuthenticationService } from '../utilities/authentication.service';

@Component(
{
    templateUrl: './novelDetail.component.html'
})
export class NovelDetailComponent implements OnInit
{
    novel: Novel

    constructor(private db: DatabaseService, private auth: AuthenticationService,
        public read: ReadingListService, private route: ActivatedRoute,
        private modalService: NgbModal) {}

    async ngOnInit()
    {
        this.novel = this.route.snapshot.data['novel']
    }

    async markAllChaptersRead()
    {
        if (!this.auth.isLoggedIn)
        {
            this.modalService.open(LoginOrRegisterComponent)
            return
        }
        await this.read.markChaptersAsRead(this.novel.chapters.map(ch => ch.guid))
    }

    async markAllChaptersUnRead()
    {
        await this.read.markChaptersAsUnread(this.novel.chapters.map(ch => ch.guid))
    }

    areAllChaptersRead()
    {
        return this.novel.chapters.every(ch => this.read.readChapters.includes(ch.guid))
    }
}
