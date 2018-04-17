import { Component, Input } from '@angular/core'
import { NovelRequest } from '@app/firebaseLayer'

@Component(
{
    selector: 'wnu-novelrequest',
    templateUrl: './novelRequest.component.html'
})
export class NovelRequestComponent
{
    @Input() request: NovelRequest
}
