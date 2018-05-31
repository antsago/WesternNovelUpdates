import { Component, Input, Output, EventEmitter} from '@angular/core'
import { ListsService, MessageService } from '@app/core'

@Component(
{
    selector: 'wnu-CreateListForm',
    template: `
        <form class="form-inline w-100 input-group pt-4">
            <input [(ngModel)]="newListName"
                name="newListName"
                type="text"
                class="form-control"
                placeholder="Write the title for a new list"
                required
            >
            <div class="input-group-append">
                <button (click)="addNewList()" type="submit" class="btn btn-darkwnu px-3 py-2">
                    Create list
                </button>
            </div>
        </form>`
})
export class CreateListFormComponent
{
    newListName = ''
    @Output() createList = new EventEmitter<string>()

    constructor(private lists: ListsService, private as: MessageService) {}

    async addNewList()
    {
        this.createList.emit(this.newListName)
        this.newListName = ''
    }
}
