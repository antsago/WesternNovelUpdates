import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './appRouting.module'

import { LatestChaptersComponent } from './latestChapters/latestChapters.component'
import { NovelsComponent } from './novels/novels.component'
import { NovelDetailComponent } from './novelDetail/novelDetail.component'
import { ChapterRowComponent } from './chapterRow.component'
import { ReadingListComponent } from './readingList/readingList.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelListComponent } from './readingList/novelList.component'


@NgModule(
{
    imports:
    [
        RouterModule,
        CommonModule,
        NgbModule,
        AppRoutingModule
    ],
    declarations:
    [
        ChapterRowComponent,
        LatestChaptersComponent,
        NovelsComponent,
        NovelDetailComponent,
        ReadingListComponent,
        NovelListComponent,
        MissingPageComponent
    ]
})
export class CoreModule {}
