import { Component, Input } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ReadingListService, List } from '@app/core'

@Component(
{
    selector: 'wnu-list',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './list.component.html'
})
export class ListComponent
{
    @Input() list: List

    public listCollapsed = false

    private dialog: NgbModalRef
    private newListName: string
    private errorMessage: string

    constructor(public read: ReadingListService, private modal: NgbModal) {}

    async setListAsDefault()
    {
        await this.read.setDefaultList(this.list)
    }

    openDialog(dialogContent)
    {
        this.newListName = ''
        this.errorMessage = null
        this.dialog = this.modal.open(dialogContent)
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
}
