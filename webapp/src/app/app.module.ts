import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestore } from 'angularfire2/firestore'

import { AppComponent } from './app.component'
import { environment } from './../environments/environment'


@NgModule(
{
    declarations: 
    [
        AppComponent
    ],
    imports: 
    [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent]
})
export class AppModule { }
