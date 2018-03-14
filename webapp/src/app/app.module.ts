import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import * as firebase from 'firebase'

import { CoreModule } from './core/core.module'

import { DatabaseService } from './database.service'
import { UserService } from './user.service'
import { AppRoutingModule } from './appRouting.module'
import { AppRootComponent } from './appRoot.component'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { MissingPageComponent } from './missingPage.component'
import { environment } from './../environments/environment'


@NgModule(
{
    imports:
    [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        CoreModule
    ],
    declarations:
    [
        AppRootComponent,
        MissingPageComponent,
        LoginOrRegisterComponent
    ],
    entryComponents: [ LoginOrRegisterComponent ],
    providers: [ DatabaseService, UserService ],
    bootstrap: [ AppRootComponent ]
})
export class AppModule
{
    constructor()
    {
        firebase.initializeApp(environment.firebase)
    }
}
