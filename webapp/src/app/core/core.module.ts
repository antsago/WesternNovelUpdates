import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '@app/shared'

import { ListsService } from './lists.service'
import { ReadChaptersService } from './readChapters.service'
import { UserService } from './user.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component/loginOrRegister.component'
import { MessageService } from './message.service'
import { MessageComponent } from './message.component'
import { GoogleAnalyticsService } from './googleAnalytics.service'
import { ProfileComponent } from './profile.component/profile.component'
import { UserDetailsComponent } from './profile.component/userDetails.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        FormsModule,
        NgbModule,
        SharedModule
    ],
    declarations:
    [
        LoginOrRegisterComponent,
        ProfileComponent,
        MessageComponent,
        UserDetailsComponent
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
        MessageService,
        UserService,
        GoogleAnalyticsService
    ],
    exports:
    [
        MessageComponent
    ]
})
export class CoreModule {}

