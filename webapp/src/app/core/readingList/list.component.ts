import { Component, Input } from '@angular/core'
import { ListNovel, ReadingListService } from '../../shared/shared.module'

@Component(
{
    selector: 'wnu-list',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './list.component.html'
})
export class ListComponent
{
    private listsCollapsed = false
    @Input() listName: string
    @Input() novels: ListNovel[]

    constructor(private read: ReadingListService) {}

    async setListAsDefault(listName: string)
    {
        await this.read.setDefaultList(listName)
    }
}
