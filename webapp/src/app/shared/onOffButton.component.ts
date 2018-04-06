import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component(
{
    selector: 'wnu-OnOffButton',
    templateUrl: 'onOffButton.component.html'
})
export class OnOffButtonComponent
{
    @Input() isOn: boolean
    @Input() onIcon: string
    @Input() onTooltip: string
    @Input() offIcon: string
    @Input() offTooltip: string
    @Input() color: string

    @Output() clikedOn = new EventEmitter<void>()
    @Output() clikedOff = new EventEmitter<void>()

    onClick()
    {
        this.clikedOn.emit()
    }

    offClick()
    {
        this.clikedOff.emit()
    }
}
