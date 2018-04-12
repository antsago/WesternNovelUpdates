import { Component, Input, EventEmitter, Output } from '@angular/core'
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { List, ListsService } from '@app/core'

@Component(
{
    selector: 'wnu-ListMenu',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './listMenu.component.html'
})
export class ListMenuComponent
{
    @Input() list: List

    private dialog: NgbModalRef
    private newListName: string
    private errorMessage: string

    constructor(public lists: ListsService, private modal: NgbModal) {}

    openDialog(dialogContent)
    {
        this.newListName = ''
        this.errorMessage = null
        this.dialog = this.modal.open(dialogContent, {centered: true})
    }

    async setListAsDefault()
    {
        await this.lists.setDefaultList(this.list)
    }

    async renameList()
    {
        try
        {
            await this.lists.renameList(this.list, this.newListName)
            this.dialog.close()
        }
        catch (error)
        {
            this.errorMessage = error.message
        }
    }

    async deleteList()
    {
        await this.lists.deleteList(this.list)
        this.dialog.close()
    }

    isDefaultList(): boolean
    {
        return this.lists.defaultList.listId === this.list.listId
    }
}
