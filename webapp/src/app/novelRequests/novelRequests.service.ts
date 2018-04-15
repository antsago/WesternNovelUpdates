import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AddNovelComponent } from './addNovel.component'
import { ViewNovelRequestsComponent } from './viewNovelRequests.component'

@Injectable()
export class NovelRequestsService
{
    constructor(private modal: NgbModal) {}

    addNovel()
    {
        this.modal.open(AddNovelComponent, {centered: true})
    }

    viewNovelRequests()
    {
        this.modal.open(ViewNovelRequestsComponent, {centered: true})
    }
}
