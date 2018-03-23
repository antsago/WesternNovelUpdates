import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestUpdatesComponent } from './core/latestUpdates.component'
import { NovelsComponent } from './core/novels.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelDetailComponent } from './core/novelDetail.component'
import { NovelDetailResolver } from './core/novelDetailResolver.service'
import { NovelsResolver } from './core/novelsResolver.service'
import { ChaptersResolver } from './core/chaptersResolver.service'

const appRoutes: Routes =
[
    {
        path: 'latestUpdates',
        component: LatestUpdatesComponent,
        resolve:
        {
            chapters: ChaptersResolver,
            novels: NovelsResolver
        }
    },
    {
        path: 'novels',
        component: NovelsComponent,
        resolve: {novels: NovelsResolver }
    },
    {
        path: 'novels/:id',
        component: NovelDetailComponent,
        resolve: { novel: NovelDetailResolver }
    },
    { path: '', redirectTo: '/latestUpdates', pathMatch: 'full'},
    { path: '**', component: MissingPageComponent }
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ],
    providers: [ NovelDetailResolver, NovelsResolver, ChaptersResolver ]
})
export class AppRoutingModule {}
