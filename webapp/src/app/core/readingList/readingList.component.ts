import { Component } from '@angular/core'
import { LoginService, ReadingListService } from '../../shared/shared.module'

@Component(
{
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    constructor(private login: LoginService, private read: ReadingListService){}

    loginOrRegister(event)
    {
        this.login.login()
    }
}
