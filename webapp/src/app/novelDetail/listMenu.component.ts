import { Component, Input, EventEmitter, Output } from '@angular/core'
import { List } from '@app/core'

@Component(
{
    selector: 'wnu-ListMenu',
    templateUrl: './listMenu.component.html'
})
export class ListMenuComponent
{
    @Input() isLoggedIn: boolean
    @Input() lists: List[]
    @Input() listWithNovel: List
    @Input() defaultList: List

    @Output() movedToList = new EventEmitter<List>()
    @Output() savedInList = new EventEmitter<List>()
    @Output() deletedFromList = new EventEmitter<void>()

    saveInList(list)
    {
        this.savedInList.emit(list)
    }

    moveToList(list)
    {
        this.movedToList.emit(list)
    }

    deleteFromList()
    {
        this.deletedFromList.emit()
    }
}
