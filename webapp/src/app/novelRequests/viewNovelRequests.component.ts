import { Component, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DatabaseService, NovelRequest } from '@app/core'

@Component(
{
    templateUrl: './viewNovelRequests.component.html'
})
export class ViewNovelRequestsComponent implements OnInit
{
    novelRequests = [] as NovelRequest[]
    selectedRequest: NovelRequest

    constructor(public activeModal: NgbActiveModal, private db: DatabaseService) {}

    async ngOnInit()
    {
        this.novelRequests = await this.db.getNovelRequests()
        if (this.novelRequests.length > 0)
        {
            this.selectedRequest = this.novelRequests[0]
        }
    }

    selectRequest(request)
    {
        this.selectedRequest = request
    }
}
