import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import * as firebase from 'firebase'

import { CoreModule } from './core/core.module'

import { DatabaseService } from './utilities/database.service'
import { ReadingListService } from './utilities/readingList.service'
import { AuthenticationService } from './utilities/authentication.service'
import { AppRoutingModule } from './appRouting.module'
import { AppRootComponent } from './appRoot.component'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { MissingPageComponent } from './missingPage.component'
import { ReadingListComponent } from './readingList.component'
import { IsLoggedInGuard } from './isLoggedInGuard.service'
import { environment } from './../environments/environment'
import { LoginService } from './utilities/login.service'


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
        LoginOrRegisterComponent,
        ReadingListComponent
    ],
    entryComponents: [ LoginOrRegisterComponent ],
    providers:
    [
        DatabaseService,
        ReadingListService,
        IsLoggedInGuard,
        AuthenticationService,
        LoginService
    ],
    bootstrap: [ AppRootComponent ]
})
export class AppModule
{
    constructor()
    {
        firebase.initializeApp(environment.firebase)
    }
}
