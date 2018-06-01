import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { WnuRoutes } from './routes'
import { ChaptersResolver } from './chaptersResolver.service'
import { NovelsResolver } from './novelsResolver.service'
import { NovelResolver } from './novelResolver.service'
import { NovelChaptersResolver } from './novelChaptersResolver.service'
import { TitleService } from './title.service'

@NgModule(
{
    imports:
    [
        BrowserModule,
        RouterModule.forRoot(WnuRoutes)
    ],
    exports: [ RouterModule ],
    providers:
    [
        NovelChaptersResolver,
        NovelsResolver,
        ChaptersResolver,
        NovelResolver,
        TitleService
    ]
})
export class RoutingModule {}
