import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LatestChaptersComponent, ChaptersResolver } from '@app/latestChapters'
import { ReadingListComponent } from '@app/readingList'
import { MissingPageComponent } from './core/missingPage.component'
import { NovelDetailComponent, NovelDetailResolver } from '@app/novelDetail'
import { NovelsResolver, NovelsComponent } from '@app/novels'


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
