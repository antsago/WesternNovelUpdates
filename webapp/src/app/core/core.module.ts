import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DatabaseService } from './database.service'
import { ReadingListService } from './readingList.service'
import { AuthenticationService } from './user/authentication.service'
import { LoginService } from './user/login.service'
import { LoginOrRegisterComponent } from './user/loginOrRegister.component'
import { AlertService } from './alert.service'

@NgModule(
{
    imports:
    [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations: [ LoginOrRegisterComponent ],
    entryComponents: [ LoginOrRegisterComponent ],
    providers:
    [
        DatabaseService,
        ReadingListService,
        AuthenticationService,
        AlertService,
        LoginService
    ]
})
export class CoreModule {}

