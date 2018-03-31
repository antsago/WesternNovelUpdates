import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LatestChaptersComponent } from './latestChapters/latestChapters.component'
import { ChaptersResolver } from './latestChapters/chaptersResolver.service'
import { NovelsComponent } from './novels/novels.component'
import { NovelsResolver } from './novels/novelsResolver.service'
import { NovelDetailComponent } from './novelDetail/novelDetail.component'
import { NovelDetailResolver } from './novelDetail/novelDetailResolver.service'
import { ReadingListComponent } from './readingList/readingList.component'
import { MissingPageComponent } from './missingPage.component'

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
