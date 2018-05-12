import { Component, ViewChild } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService, DatabaseService } from 'wnu-shared'
import { AlertComponent } from '@app/shared'
import { GoogleAnalyticsService } from '../googleAnalytics.service'

@Component(
{
    templateUrl: './profile.component.html'
})
export class ProfileComponent
{
    @ViewChild('deleteAlert')
    private deleteAlert: AlertComponent
    deleteAcknowledged = false

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open profile', 'Authentication')
    }

    async deleteAccount(password: string)
    {
        try
        {
            await this.auth.reauthenticate(password)
            await this.db.users.delete(this.auth.currentUser().uid)
            await this.auth.deleteUser()

            this.ga.emitEvent('deleted account', 'Authentication')
            this.activeModal.close('Account deleted')
        }
        catch (err)
        {
            this.deleteAlert.showMessage(err.message)
        }
    }
}
