import { Injectable, InjectionToken, Inject } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

export const GoogleAnalytics_ID = new InjectionToken<string>('GA_TRACKING_ID')
type Categories = 'Authentication' | 'Reading' | 'Novel requests' | 'Lists'

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

    emitEvent(eventName: string, eventCategory: Categories)
    {
        (<any>window).gtag('event', eventName, {'event_category': eventCategory})
    }
}
