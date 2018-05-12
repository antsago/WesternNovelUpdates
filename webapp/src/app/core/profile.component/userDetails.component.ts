import { Component, ViewChild } from '@angular/core'
import { AuthenticationService } from 'wnu-shared'
import { AlertComponent } from '@app/shared'
import { GoogleAnalyticsService } from '../googleAnalytics.service'

@Component(
{
    selector: 'wnu-userDetails',
    templateUrl: './userDetails.component.html'
})
export class UserDetailsComponent
{
    @ViewChild('detailsAlert')
    private detailsAlert: AlertComponent

    userDetails

    constructor(private auth: AuthenticationService, private ga: GoogleAnalyticsService)
    {
        this.userDetails = {username: this.auth.currentUser().displayName, email: this.auth.currentUser().email}
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
            this.userDetails.password = ''
        }
        catch (err)
        {
            this.detailsAlert.showMessage(err.message)
        }
    }
}
