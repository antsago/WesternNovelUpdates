import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LatestUpdatesComponent } from './latestUpdates.component'
import { NovelsComponent } from './novels.component'
import { NovelDetailComponent } from './novelDetail.component'
import { DatabaseService } from './database.service'


@NgModule(
{
    imports:
    [
        RouterModule,
        CommonModule
    ],
    declarations:
    [
        LatestUpdatesComponent,
        NovelsComponent,
        NovelDetailComponent
    ],
    providers: [ DatabaseService ]
})
export class CoreModule {}
