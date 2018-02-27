import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestore } from 'angularfire2/firestore'

import { LatestUpdatesComponent } from './latestUpdates.component'
import { environment } from './../environments/environment'
import { DatabaseService } from './database.service';


@NgModule(
{
    declarations: 
    [
        LatestUpdatesComponent
    ],
    imports: 
    [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbModule.forRoot()
    ],
    providers: [AngularFirestore, DatabaseService],
    bootstrap: [LatestUpdatesComponent]
})
export class AppModule { }
