import { Routes } from '@angular/router'

import { LatestChaptersComponent } from '@app/latestChapters'
import { ReadingListComponent } from '@app/readingList'
import { NovelDetailComponent } from '@app/novelDetail'
import { NovelsComponent } from '@app/novels'
import { MissingPageComponent } from '@app/shared'

import { ChaptersResolver } from './chaptersResolver.service'
import { NovelsResolver } from './novelsResolver.service'
import { NovelResolver } from './novelResolver.service'
import { NovelChaptersResolver } from './novelChaptersResolver.service'

export const WnuRoutes: Routes =
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
