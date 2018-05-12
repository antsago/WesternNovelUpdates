import { Component } from '@angular/core'

@Component(
{
    selector: 'wnu-alert',
    template: `
        <ngb-alert *ngIf="!alertClosed" (close)="alertClosed=true">
            {{ message }}
        </ngb-alert>`
})
export class AlertComponent
{
    message = ''
    alertClosed = true

    public showMessage(error: string)
    {
        this.message = error
        this.alertClosed = false
    }
}
