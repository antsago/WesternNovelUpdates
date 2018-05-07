import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ListsService } from './lists.service'
import { ReadChaptersService } from './readChapters.service'
import { UserService } from './user.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AlertService } from './alert.service'
import { AlertComponent } from './alert.component'
import { GoogleAnalyticsService } from './googleAnalytics.service'
import { ProfileComponent } from './profile.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations:
    [
        LoginOrRegisterComponent,
        ProfileComponent,
        AlertComponent
    ],
    entryComponents:
    [
        ProfileComponent,
        LoginOrRegisterComponent
    ],
    providers:
    [
        ListsService,
        ReadChaptersService,
        AlertService,
        UserService,
        GoogleAnalyticsService
    ],
    exports:
    [
        AlertComponent
    ]
})
export class CoreModule {}

