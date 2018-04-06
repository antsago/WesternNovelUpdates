import { Component, Input, EventEmitter, Output } from '@angular/core'
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { List, ReadingListService } from '@app/core'

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

    constructor(public read: ReadingListService, private modal: NgbModal) {}

    openDialog(dialogContent)
    {
        this.newListName = ''
        this.errorMessage = null
        this.dialog = this.modal.open(dialogContent)
    }

    async setListAsDefault()
    {
        await this.read.setDefaultList(this.list)
    }

    async renameList()
    {
        try
        {
            await this.read.renameList(this.list, this.newListName)
            this.dialog.close()
        }
        catch (error)
        {
            this.errorMessage = error.message
        }
    }

    async deleteList()
    {
        await this.read.deleteList(this.list)
        this.dialog.close()
    }

    isDefaultList(): boolean
    {
        return this.read.defaultList.listId === this.list.listId
    }
}
