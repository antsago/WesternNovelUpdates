import { Component, Input } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ReadingListService, List } from '../../shared/shared.module'
import { timeout } from 'q';

@Component(
{
    selector: 'wnu-list',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './list.component.html'
})
export class ListComponent
{
    @Input() list: List

    private listCollapsed = false

    private renameDialog: NgbModalRef
    private newListName: string
    private errorMessage: string

    constructor(private read: ReadingListService, private modal: NgbModal) {}

    async setListAsDefault()
    {
        await this.read.setDefaultList(this.list)
    }

    openDialog(renameDialog)
    {
        this.newListName = ''
        this.errorMessage = null
        this.renameDialog = this.modal.open(renameDialog)
    }

    async renameList()
    {
        try
        {
            await this.read.renameList(this.list, this.newListName)
            this.renameDialog.close()
        }
        catch (error)
        {
            this.errorMessage = error.message
        }
    }
}
