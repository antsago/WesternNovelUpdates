import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LatestChaptersComponent } from './core/latestChapters/latestChapters.component'
import { ChaptersResolver } from './core/latestChapters/chaptersResolver.service'
import { NovelsComponent } from './core/novels/novels.component'
import { NovelsResolver } from './core/novels/novelsResolver.service'
import { NovelDetailComponent } from './core/novelDetail/novelDetail.component'
import { NovelDetailResolver } from './core/novelDetail/novelDetailResolver.service'
import { ReadingListComponent } from './core/readingList/readingList.component'
import { MissingPageComponent } from './core/missingPage.component'

const appRoutes: Routes =
[
    {
        path: 'latestChapters',
        component: LatestChaptersComponent,
        resolve:
        {
            chapters: ChaptersResolver,
            novels: NovelsResolver
        }
    },
    {
        path: 'novels',
        component: NovelsComponent,
        resolve: { novels: NovelsResolver }
    },
    {
        path: 'novels/:id',
        component: NovelDetailComponent,
        resolve: { novel: NovelDetailResolver }
    },
    {
        path: 'readingLists',
        component: ReadingListComponent
    },
    { path: 'latestUpdates', redirectTo: '/latestChapters', pathMatch: 'full'},
    { path: '', redirectTo: '/latestChapters', pathMatch: 'full'},
    { path: '**', component: MissingPageComponent }
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ],
    providers: [ NovelDetailResolver, NovelsResolver, ChaptersResolver ]
})
export class AppRoutingModule {}
