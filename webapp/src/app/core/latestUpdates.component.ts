import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../utilities/database.service'
import { UserService } from '../utilities/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginOrRegisterComponent } from '../loginOrRegister.component'
import { Chapter, Novel } from '../utilities/Interfaces'

@Component(
{
    templateUrl: './latestUpdates.component.html'
})
export class LatestUpdatesComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    chapters: Chapter[]
    novels: {[id: string]: Novel}

    constructor(private db: DatabaseService, private us: UserService,
        private modalService: NgbModal) {}

    async ngOnInit()
    {
        this.chapters = await this.db.getUpdates(this.NumberOfUpdates)
        const novelsArray = await this.db.getAllNovels()
        this.novels = novelsArray.reduce((map, novel) =>
        {
            map[novel.id] = novel
            return map
        }, {})
    }

    async getMoreUpdates()
    {
        const lastDate = this.chapters[this.chapters.length - 1]['publicationDate']
        const newUpdates = await this.db.getUpdatesAfter(lastDate, this.NumberOfUpdates)
        this.chapters = [...this.chapters, ...newUpdates]
    }
}
