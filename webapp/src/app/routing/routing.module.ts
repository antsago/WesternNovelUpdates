import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { WnuRoutes } from './routes'
import { ChaptersResolver } from './chaptersResolver.service'
import { NovelsResolver } from './novelsResolver.service'
import { NovelResolver } from './novelResolver.service'
import { NovelChaptersResolver } from './novelChaptersResolver.service'

@NgModule(
{
    imports: [ RouterModule.forRoot(WnuRoutes) ],
    exports: [ RouterModule ],
    providers: [ NovelChaptersResolver, NovelsResolver, ChaptersResolver, NovelResolver ]
})
export class RoutingModule {}
