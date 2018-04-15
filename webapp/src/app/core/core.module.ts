import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DatabaseService } from './database.service'
import { ListsService } from './lists.service'
import { ReadChaptersService } from './readChapters.service'
import { AuthenticationService } from './authentication.service'
import { UserService } from './user.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component'
import { AlertService } from './alert.service'
import { AlertComponent } from './alert.component'

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
        AlertComponent
    ],
    entryComponents: [ LoginOrRegisterComponent ],
    providers:
    [
        DatabaseService,
        ListsService,
        ReadChaptersService,
        AuthenticationService,
        AlertService,
        UserService
    ],
    exports:
    [
        AlertComponent
    ]
})
export class CoreModule {}

