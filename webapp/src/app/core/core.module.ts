import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ChapterRowComponent } from './chapterRow.component'
import { LatestChaptersComponent } from './latestChapters.component'
import { NovelsComponent } from './novels.component'
import { NovelDetailComponent } from './novelDetail.component'


@NgModule(
{
    imports:
    [
        RouterModule,
        CommonModule
    ],
    declarations:
    [
        ChapterRowComponent,
        LatestChaptersComponent,
        NovelsComponent,
        NovelDetailComponent
    ]
})
export class CoreModule {}
