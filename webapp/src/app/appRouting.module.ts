import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestChaptersComponent } from './core/latestChapters.component'
import { NovelsComponent } from './core/novels.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelDetailComponent } from './core/novelDetail.component'
import { NovelDetailResolver } from './core/novelDetailResolver.service'
import { NovelsResolver } from './core/novelsResolver.service'
import { ChaptersResolver } from './core/chaptersResolver.service'
import { ReadingListComponent } from './core/readingList.component'

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
