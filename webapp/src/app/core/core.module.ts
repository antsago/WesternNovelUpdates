import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { LatestChaptersComponent } from './latestChapters.component'
import { NovelsComponent } from './novels.component'
import { NovelDetailComponent } from './novelDetail.component'
import { ChapterRowComponent } from './chapterRow.component'
import { ReadingListComponent } from './readingList.component'


@NgModule(
{
    imports:
    [
        RouterModule,
        CommonModule,
        NgbModule.forRoot()
    ],
    declarations:
    [
        ChapterRowComponent,
        LatestChaptersComponent,
        NovelsComponent,
        NovelDetailComponent,
        ReadingListComponent
    ]
})
export class CoreModule {}
