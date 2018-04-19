import { Component, Input } from '@angular/core'
import { NovelRequest } from 'wnu-firebase'

@Component(
{
    selector: 'wnu-novelrequest',
    templateUrl: './novelRequest.component.html'
})
export class NovelRequestComponent
{
    @Input() request: NovelRequest
}
