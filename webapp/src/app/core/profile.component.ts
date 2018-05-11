import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService, DatabaseService } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

@Component(
{
    templateUrl: './profile.component.html'
})
export class ProfileComponent
{
    deleteAcknowledged = false
    confirmPasswordDelete = ''
    errorMessage = ''
    alertClosed = true

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open profile', 'Authentication')
    }

    async deleteAccount()
    {
        try
        {
            await this.auth.reauthenticate(this.confirmPasswordDelete)
            await this.db.users.delete(this.auth.currentUser.uid)
            await this.auth.deleteUser()

            this.ga.emitEvent('delete Account', 'Authentication')
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.errorMessage = err.message
            this.alertClosed = false
        }
    }
}
