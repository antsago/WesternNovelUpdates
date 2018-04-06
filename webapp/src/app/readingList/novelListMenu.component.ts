import { Component, Input, EventEmitter, Output } from '@angular/core'
import { List } from '@app/core'

@Component(
{
    selector: 'wnu-NovelListMenu',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './novelListMenu.component.html'
})
export class NovelListMenuComponent
{
    @Input() lists: List[]
    @Input() listWithNovel: List

    @Output() novelMoved = new EventEmitter<List>()
    @Output() novelDeleted = new EventEmitter<void>()

    moveToList(list)
    {
        this.novelMoved.emit(list)
    }

    deleteNovel()
    {
        this.novelDeleted.emit()
    }
}
