import { Component } from '@angular/core'
import { LoginService, ReadingListService, AlertService } from '@app/shared/shared.module'

@Component(
{
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    public newListName = ''

    constructor(public login: LoginService, private read: ReadingListService, private as: AlertService){}

    async loginOrRegister(event)
    {
        await this.login.login()
    }

    async addNewList()
    {
        try
        {
            await this.read.addNewList(this.newListName.trim())
            this.newListName = ''
        }
        catch (error)
        {
            this.as.displayAlert(error.message, this.as.ERROR)
        }
    }
}
