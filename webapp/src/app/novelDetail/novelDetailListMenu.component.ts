import { Component, Input, EventEmitter, Output } from '@angular/core'
import { List } from 'wnu-shared'

@Component(
{
    selector: 'wnu-NovelDetailListMenu',
    templateUrl: './novelDetailListMenu.component.html'
})
export class NovelDetailListMenuComponent
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
