import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { UserService, GoogleAnalyticsService } from '@app/core'
import { NovelRequestsService } from '@app/novelRequests'
import { TitleService } from '@app/routing'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    constructor(public user: UserService, private requests: NovelRequestsService,
        private gas: GoogleAnalyticsService, private title: TitleService)
    {
        this.gas.trackPageViews()
        this.title.setPageTitlesAutomatically()
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

    viewProfile()
    {
        this.user.viewProfile()
    }
}

