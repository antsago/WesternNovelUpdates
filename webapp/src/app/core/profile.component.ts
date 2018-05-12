import { Component, ViewChild, ElementRef } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService, DatabaseService } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'
import { AlertComponent } from '@app/shared'

@Component(
{
    templateUrl: './profile.component.html'
})
export class ProfileComponent
{
    @ViewChild('deleteAlert')
    private deleteAlert: AlertComponent

    userDetails
    deleteAcknowledged = false

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open profile', 'Authentication')
        this.userDetails = {username: this.auth.currentUser.displayName, email: this.auth.currentUser.email}
    }

    async deleteAccount(password: string)
    {
        try
        {
            await this.auth.reauthenticate(password)
            await this.db.users.delete(this.auth.currentUser.uid)
            await this.auth.deleteUser()

            this.ga.emitEvent('delete Account', 'Authentication')
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.deleteAlert.showMessage(err.message)
        }
    }
}
