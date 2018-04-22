import { Component, Input } from '@angular/core'
import { List } from 'wnu-shared'

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
