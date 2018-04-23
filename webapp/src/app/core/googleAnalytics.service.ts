import { Injectable, InjectionToken, Inject } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

export const GoogleAnalytics_ID = new InjectionToken<string>('GA_TRACKING_ID')

@Injectable()
export class GoogleAnalyticsService
{
    constructor(@Inject(GoogleAnalytics_ID) private readonly gaId: string, private router: Router) {}

    trackPageViews()
    {
        this.router.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            {
                (<any>window).gtag('config', this.gaId, {'page_location': event.urlAfterRedirects})
            }
        })
    }
}
