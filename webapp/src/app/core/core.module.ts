import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ChapterRowComponent } from './chapterRow.component'
import { LatestUpdatesComponent } from './latestUpdates.component'
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
        LatestUpdatesComponent,
        NovelsComponent,
        NovelDetailComponent
    ]
})
export class CoreModule {}
