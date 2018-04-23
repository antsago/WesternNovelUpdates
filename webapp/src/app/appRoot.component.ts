import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { UserService, GoogleAnalyticsService } from '@app/core'
import { NovelRequestsService } from '@app/novelRequests'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    constructor(public user: UserService, private requests: NovelRequestsService, private gas: GoogleAnalyticsService)
    {
        this.gas.trackPageViews()
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

