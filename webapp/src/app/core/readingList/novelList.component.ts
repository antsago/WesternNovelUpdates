import { Component, Input } from '@angular/core'
import { LoginService, ReadingListService, Novel } from '../../shared/shared.module'

@Component(
{
    selector: 'wnu-listnovel',
    styles: ['.dropdown-toggle::after {display:none;}'],
    templateUrl: './novelList.component.html'
})
export class NovelListComponent
{
    @Input() novel: Novel
    public novelCollapsed = true

    constructor(private login: LoginService, private read: ReadingListService){}

    loginOrRegister(event)
    {
        this.login.login()
    }
}


