import { Component, Input } from '@angular/core'
import { ReadingListService, List } from '../../shared/shared.module'

@Component(
{
    selector: 'wnu-list',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './list.component.html'
})
export class ListComponent
{
    private listCollapsed = false
    @Input() list: List

    constructor(private read: ReadingListService) {}

    async setListAsDefault()
    {
        await this.read.setDefaultList(this.list)
    }
}
