import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

const DefaultTitle = 'Novels of the West - Directory of original english novels'

@Injectable()
export class TitleService
{
    constructor(private router: Router, private route: ActivatedRoute, private pageTitle: Title) {}

    setPageTitlesAutomatically()
    {
        this.router.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            {
                const title = this.isNovelDetailsPage(event.urlAfterRedirects) ? this.getNovelTitle() : DefaultTitle
                this.setTitle(title)
            }
        })
    }

    setTitle(title)
    {
        this.pageTitle.setTitle(title)
    }

    private isNovelDetailsPage(url): boolean
    {
        return /^\/novels\/[^/]+$/i.test(url)
    }

    private getNovelTitle(): string
    {
        return `${this.route.snapshot.firstChild.data['novel'].title} - Novels of the West`
    }
}
