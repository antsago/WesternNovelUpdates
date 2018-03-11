import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from 'angularfire2'

import { CoreModule } from './core/core.module'

import { AppRoutingModule } from './appRouting.module'
import { AppRootComponent } from './appRoot.component'
import { MissingPageComponent } from './missingPage.component'
import { environment } from './../environments/environment'


@NgModule(
{
    imports:
    [
        AppRoutingModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbModule.forRoot(),
        CoreModule
    ],
    declarations:
    [
        AppRootComponent,
        MissingPageComponent,
    ],
    bootstrap: [ AppRootComponent ]
})
export class AppModule { }
