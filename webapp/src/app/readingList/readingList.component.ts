import { Component } from '@angular/core'
import { LoginService, ListsService, AlertService } from '@app/core'

@Component(
{
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    public newListName = ''

    constructor(public login: LoginService, private lists: ListsService, private as: AlertService){}

    async loginOrRegister(event)
    {
        await this.login.login()
    }

    async addNewList()
    {
        try
        {
            await this.lists.addNewList(this.newListName.trim())
            this.newListName = ''
        }
        catch (error)
        {
            this.as.displayAlert(error.message, this.as.ERROR)
        }
    }
}
