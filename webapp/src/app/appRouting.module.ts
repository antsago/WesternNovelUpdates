import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LatestChaptersComponent, ChaptersResolver } from '@app/latestChapters'
import { ReadingListComponent } from '@app/readingList'
import { NovelDetailComponent, NovelChaptersResolver, NovelResolver } from '@app/novelDetail'
import { NovelsResolver, NovelsComponent } from '@app/novels'
import { MissingPageComponent } from '@app/shared'


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
        resolve:
        {
            novel: NovelResolver,
            chapters: NovelChaptersResolver
        }
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
    providers: [ NovelChaptersResolver, NovelsResolver, ChaptersResolver, NovelResolver ]
})
export class AppRoutingModule {}
