import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestore } from 'angularfire2/firestore'

import { AppRoutingModule } from './appRouting.module'
import { AppRootComponent } from './appRoot.component'
import { LatestUpdatesComponent } from './latestUpdates.component'
import { NovelsComponent } from './novels.component'
import { environment } from './../environments/environment'
import { DatabaseService } from './database.service'


@NgModule(
{
    imports:
    [
        AppRoutingModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbModule.forRoot()
    ],
    declarations:
    [
        AppRootComponent,
        LatestUpdatesComponent,
        NovelsComponent
    ],
    providers: [ AngularFirestore, DatabaseService ],
    bootstrap: [ AppRootComponent ]
})
export class AppModule { }
