import { Component } from '@angular/core'
import { LoginService, ReadingListService } from '../../shared/shared.module'

@Component(
{
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
