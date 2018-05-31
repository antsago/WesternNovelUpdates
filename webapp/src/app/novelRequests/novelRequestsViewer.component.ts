import { Component, Input, EventEmitter, Output } from '@angular/core'
import { NovelRequest } from 'wnu-shared'

@Component(
{
    selector: 'wnu-RequestViewer',
    templateUrl: './novelRequestsViewer.component.html'
})
export class NovelRequestsViewerComponent
{
    @Input() novelRequests: NovelRequest[]

    @Input() selectedRequest: NovelRequest
    @Output() selectedRequestChange = new EventEmitter<NovelRequest>()

    selectRequest(request: NovelRequest)
    {
        this.selectedRequestChange.emit(request)
    }
}
