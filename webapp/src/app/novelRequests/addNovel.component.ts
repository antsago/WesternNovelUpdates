import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DatabaseService } from '@app/core'

@Component(
{
    templateUrl: './addNovel.component.html'
})
export class AddNovelComponent
{
    request =
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

    async sendRequest()
    {
        try
        {
            this.validateNovelRequest()
            await this.db.requests.add(this.request)
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

    private validateNovelRequest()
    {
        this.request =
        {
            title: this.request.title.trim(),
            author: this.request.author.trim(),
            synopsis: this.request.synopsis.trim(),
            homepage: this.request.homepage.trim(),
            rssFeed: this.request.rssFeed.trim()
        }
        if (!this.request.title || !this.request.author || !this.request.synopsis
            || !this.request.homepage || !this.request.rssFeed)
        {
            throw new Error('All novel requests fields must be filled')
        }
    }
}
