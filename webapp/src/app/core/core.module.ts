import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'

import { LatestUpdatesComponent } from './latestUpdates.component'
import { NovelsComponent } from './novels.component'
import { NovelDetailComponent } from './novelDetail.component'
import { DatabaseService } from './database.service'


@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        LatestUpdatesComponent,
        NovelsComponent,
        NovelDetailComponent
    ],
    providers: [ AngularFirestore, DatabaseService ]
})
export class CoreModule {}
