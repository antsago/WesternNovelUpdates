import { Component, Input } from '@angular/core'
import { NovelRequest } from 'wnu-shared'

@Component(
{
    selector: 'wnu-novelrequest',
    templateUrl: './novelRequest.component.html'
})
export class NovelRequestComponent
{
    @Input() request: NovelRequest
}
