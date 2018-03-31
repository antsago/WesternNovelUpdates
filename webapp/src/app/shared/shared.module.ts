import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DatabaseService } from './database.service'
import { ReadingListService } from './readingList.service'
import { AuthenticationService } from './authentication.service'
import { LoginService } from './login.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component'

export * from './Interfaces'
export { DatabaseService, ReadingListService, AuthenticationService,
    LoginService, LoginOrRegisterComponent }

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
        LoginService
    ]
})
export class SharedModule {}

