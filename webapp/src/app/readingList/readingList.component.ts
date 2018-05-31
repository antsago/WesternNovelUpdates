import { Component } from '@angular/core'
import { UserService, ListsService, MessageService } from '@app/core'

@Component(
{
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    constructor(public login: UserService, private lists: ListsService, private as: MessageService){}

    async loginOrRegister(event)
    {
        await this.login.login()
    }

    async addNewList(listName: string)
    {
        try
        {
            await this.lists.addNewList(listName.trim())
        }
        catch (error)
        {
            this.as.displayAlert(error.message, this.as.ERROR)
        }
    }
}
