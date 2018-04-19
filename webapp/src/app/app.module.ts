import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import * as firebase from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects

import { AuthenticationService, DatabaseService } from 'wnu-firebase'

import { SharedModule } from './shared/shared.module'
import { AppRootComponent } from './appRoot.component'

import { environment } from '@env/environment'
import { LatestChaptersModule } from '@app/latestChapters'
import { AppRoutingModule } from '@app/appRouting.module'
import { ReadingListModule } from '@app/readingList'
import { NovelDetailModule } from '@app/novelDetail'
import { NovelsModule } from '@app/novels'
import { NovelRequestsModule } from '@app/novelRequests'
import { CoreModule } from '@app/core'

@NgModule(
{
    imports:
    [
        BrowserModule,
        CommonModule,
        RouterModule,

        NgbModule.forRoot(),

        AppRoutingModule,
        CoreModule,
        SharedModule,
        LatestChaptersModule,
        ReadingListModule,
        NovelDetailModule,
        NovelsModule,
        NovelRequestsModule,
    ],
    providers:
    [
        { provide: firebase.auth.Auth, useFactory: () => firebase.auth() },
        {
            provide: AuthenticationService,
            useFactory: (fa: firebase.auth.Auth) => new AuthenticationService(fa),
            deps: [firebase.auth.Auth]
        },
        { provide: firebase.firestore.Firestore, useFactory: () => firebase.firestore() },
        {
            provide: DatabaseService,
            useFactory: (fs: firebase.firestore.Firestore) => DatabaseService.createDatabaseService(fs),
            deps: [firebase.firestore.Firestore]
        }
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
