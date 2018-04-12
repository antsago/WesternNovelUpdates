import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DatabaseService } from '@app/core'

@Component(
{
    templateUrl: './addNovel.component.html'
})
export class AddNovelComponent
{
    novel =
    {
        title: '',
        author: '',
        synopsis: '',
        homepage: '',
        rssFeed: ''
    }
    errorMessage = ''
    alertClosed = true

    constructor(public activeModal: NgbActiveModal, private db: DatabaseService) {}

    async addNovel()
    {
        try
        {
            await this.db.addPendingNovel(this.novel)
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.showErrorMessage(err.message)
        }
    }

    private showErrorMessage(message)
    {
        this.alertClosed = false
        this.errorMessage = message
    }
}
