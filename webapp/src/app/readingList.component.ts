import { Component } from '@angular/core'
import { LoginService } from './utilities/login.service'

@Component(
{
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    constructor(private login: LoginService) {}

    loginOrRegister()
    {
        this.login.login()
    }
}


