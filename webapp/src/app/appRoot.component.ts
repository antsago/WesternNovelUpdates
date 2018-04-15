import { Component } from '@angular/core'
import { UserService } from '@app/core'
import { NovelRequestsService } from '@app/novelRequests'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    constructor(public user: UserService, private requests: NovelRequestsService) {}

    loginOrRegister()
    {
        this.user.login()
    }

    logout()
    {
        this.user.logout()
    }

    addNovel()
    {
        this.requests.addNovel()
    }

    viewNovelRequests()
    {
        this.requests.viewNovelRequests()
    }
}

