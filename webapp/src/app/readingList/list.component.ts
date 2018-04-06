import { Component, Input } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ReadingListService, List } from '@app/core'

@Component(
{
    selector: 'wnu-list',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './list.component.html'
})
export class ListComponent
{
    @Input() list: List
    @Input() isDefaultList: boolean
    public listCollapsed = false
}
