import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { UserService } from '@app/core'
import { NovelRequestsService } from '@app/novelRequests'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    constructor(public user: UserService, private requests: NovelRequestsService, private router: Router)
    {
        this.router.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            {
                (<any>window).gtag('config', 'UA-118005376-1')
            }
        })
    }

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

