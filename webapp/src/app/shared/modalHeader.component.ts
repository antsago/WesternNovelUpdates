import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component(
{
    selector: 'wnu-ModalHeader',
    template: `
        <div class="modal-header">
            <h4 class="modal-title light-wnucolor">{{title}}</h4>
            <button type="button" class="close" aria-label="Close" (click)="onClose()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`
})
export class ModalHeaderComponent
{
    @Input() title: string
    @Output() close = new EventEmitter<void>()

    onClose()
    {
        this.close.emit()
    }
}
