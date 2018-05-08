import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

@Component(
{
    templateUrl: './profile.component.html'
})
export class ProfileComponent
{
    deleteAcknowledged = false

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open profile', 'Authentication')
    }

    async deleteAccount()
    {
    }
}
