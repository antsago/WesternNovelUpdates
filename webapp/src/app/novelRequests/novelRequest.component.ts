import { Component, Input } from '@angular/core'
import { NovelRequest } from '@app/core'

@Component(
{
    selector: 'wnu-novelrequest',
    templateUrl: './novelRequest.component.html'
})
export class NovelRequestComponent
{
    @Input() request: NovelRequest
}
