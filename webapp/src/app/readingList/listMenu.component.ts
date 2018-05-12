import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core'
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { List } from 'wnu-shared'
import { ListsService, GoogleAnalyticsService, MessageService } from '@app/core'
import { AlertComponent } from '@app/shared'

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

    constructor(public lists: ListsService, private modal: NgbModal,
        private ga: GoogleAnalyticsService, private ms: MessageService) {}

    openDialog(dialogContent)
    {
        this.newListName = ''
        this.dialog = this.modal.open(dialogContent, {centered: true})
        this.ga.emitEvent('open rename/delete form', 'Lists')
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
        }
        catch (error)
        {
            this.ms.displayAlert(error.message, this.ms.ERROR)
        }
        finally
        {
            this.dialog.close()
        }
    }

    async deleteList()
    {
        try
        {
            await this.lists.deleteList(this.list)
        }
        catch (error)
        {
            this.ms.displayAlert(error.message, this.ms.ERROR)
        }
        finally
        {
            this.dialog.close()
        }
    }

    isDefaultList(): boolean
    {
        return this.lists.defaultList.listId === this.list.listId
    }
}
