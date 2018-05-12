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
    @ViewChild('detailsAlert')
    private detailsAlert: AlertComponent

    userDetails
    deleteAcknowledged = false

    constructor(public activeModal: NgbActiveModal, private auth: AuthenticationService,
        private db: DatabaseService, private ga: GoogleAnalyticsService)
    {
        this.ga.emitEvent('open profile', 'Authentication')
        this.userDetails = {username: this.auth.currentUser().displayName, email: this.auth.currentUser().email}
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

    async changeDetails(password: string)
    {
        try
        {
            await this.auth.reauthenticate(password)
            await this.auth.setUsername(this.userDetails.username)
            await this.auth.setEmail(this.userDetails.email)

            if (this.userDetails.password)
            {
                await this.auth.setPassword(this.userDetails.password)
            }

            this.ga.emitEvent('changed details', 'Authentication')
            this.activeModal.close('Changed details')
        }
        catch (err)
        {
            this.detailsAlert.showMessage(err.message)
        }
    }
}
