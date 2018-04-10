import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import * as firebase from 'firebase'

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { AppRootComponent } from './appRoot.component'
import { environment } from '@env/environment'
import { LatestChaptersModule } from '@app/latestChapters'
import { AppRoutingModule } from '@app/appRouting.module'
import { ReadingListModule } from '@app/readingList'
import { NovelDetailModule } from '@app/novelDetail'
import { NovelsModule } from '@app/novels'

@NgModule(
{
    imports:
    [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        CoreModule,
        SharedModule,
        LatestChaptersModule,
        ReadingListModule,
        NovelDetailModule,
        NovelsModule
    ],
    providers:
    [
        {provide: firebase.firestore.Firestore, useFactory: () => firebase.firestore()}
    ],
    declarations: [ AppRootComponent ],
    bootstrap: [ AppRootComponent ]
})
export class AppModule
{
    constructor()
    {
        firebase.initializeApp(environment.firebase)
    }
}
