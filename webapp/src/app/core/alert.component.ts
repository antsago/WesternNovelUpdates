import { Component } from '@angular/core'
import { AlertService } from './alert.service'

@Component(
{
    selector: 'wnu-alert',
    template: `
    <div *ngIf="alertService.showAlert" [ngClass]="alertService.type"
    class="sticky-top text-center alert alert-dismissible" role="alert">
        {{ alertService.message }}
        <button type="button" class="close" (click)="alertService.showAlert = false">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
})
export class AlertComponent
{
    constructor(public alertService: AlertService) {}
}
