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
                const title = this.isNovelDetailsPage(event) ? this.getNovelTitle() : DefaultTitle
                this.setTitle(title)
            }
        })
    }

    setTitle(title)
    {
        this.pageTitle.setTitle(title)
    }

    private isNovelDetailsPage(event)
    {
        return event.urlAfterRedirects.startsWith('/novels/')
    }

    private getNovelTitle()
    {
        return `${this.route.snapshot.firstChild.data['novel'].title} - Novels of the West`
    }
}
