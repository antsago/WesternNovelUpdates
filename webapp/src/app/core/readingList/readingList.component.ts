import { Component } from '@angular/core'
import { LoginService, ReadingListService } from '../../shared/shared.module'

@Component(
{
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './readingList.component.html'
})
export class ReadingListComponent
{
    public listsCollapsed = {}
    public novelCollapsed = {}

    constructor(private login: LoginService, private read: ReadingListService){}

    loginOrRegister(event)
    {
        this.login.login()
    }

    collapseList(list)
    {
        return this.listsCollapsed[list]
    }

    toggleList(list)
    {
        this.listsCollapsed[list] = !this.listsCollapsed[list]
    }

    collapseNovel(novelName)
    {
        return !this.novelCollapsed[novelName]
    }

    toggleNovel(novelName)
    {
        this.novelCollapsed[novelName] = ! this.novelCollapsed[novelName]
    }
}


