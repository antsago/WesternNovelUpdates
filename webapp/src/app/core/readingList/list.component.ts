import { Component, Input } from '@angular/core'
import { ListNovel } from '../../shared/shared.module'

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
}
