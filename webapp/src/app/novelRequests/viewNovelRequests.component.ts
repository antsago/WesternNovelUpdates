import { Component, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DatabaseService, NovelRequest, Novel } from '@app/core'

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
        this.novelRequests.forEach(req => req.hostingSite = 'RoyalRoad')
        if (this.novelRequests.length > 0)
        {
            this.selectedRequest = this.novelRequests[0]
        }
    }

    async deleteRequest(selectedRequest: NovelRequest)
    {
        this.novelRequests = this.novelRequests.filter(req => req.id !== selectedRequest.id)
        this.selectedRequest = this.novelRequests[0]
        await this.db.deleteNovelRequest(selectedRequest)
    }

    async approveRequest(selectedRequest: NovelRequest)
    {
        await this.deleteRequest(selectedRequest)
        await this.db.novels.addNovel(selectedRequest as Novel)
    }
}
