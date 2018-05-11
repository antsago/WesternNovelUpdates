import { Component, ViewChild } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DatabaseService } from 'wnu-shared'
import { GoogleAnalyticsService } from '@app/core'
import { AlertComponent } from '@app/shared'

@Component(
{
    templateUrl: './addNovel.component.html'
})
export class AddNovelComponent
{
    @ViewChild('alert')
    private alert: AlertComponent

    request =
    {
        title: '',
        author: '',
        synopsis: '',
        homepage: '',
        rssFeed: ''
    }

    constructor(public activeModal: NgbActiveModal, private db: DatabaseService,
        private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open requests form', 'Novel requests')
    }

    async sendRequest()
    {
        try
        {
            this.validateNovelRequest()
            await this.db.requests.add(this.request)
            this.ga.emitEvent('send request', 'Novel requests')
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.alert.showMessage(err.message)
        }
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
