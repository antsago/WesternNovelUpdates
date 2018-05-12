import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component(
{
    selector: 'wnu-confirmPassword',
    templateUrl: './confirmPassword.component.html'
})
export class ConfirmPasswordComponent
{
    @Input() disabled: boolean
    @Input() buttonClass: string
    @Input() buttonText: string

    @Output() submit = new EventEmitter<string>()

    password = ''

    submitPassword()
    {
        this.submit.emit(this.password)
    }
}
