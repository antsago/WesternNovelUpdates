import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ChapterRowComponent } from './chapterRow.component'
import { MissingPageComponent } from './missingPage.component'
import { OnOffButtonComponent } from './onOffButton.component'
import { ConfirmPasswordComponent } from './confirmPassword.component'
import { AlertComponent } from './alert.component'


@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule,
        FormsModule,
        NgbModule
    ],
    declarations:
    [
        ChapterRowComponent,
        OnOffButtonComponent,
        MissingPageComponent,
        ConfirmPasswordComponent,
        AlertComponent
    ],
    exports:
    [
        ChapterRowComponent,
        OnOffButtonComponent,
        ConfirmPasswordComponent,
        AlertComponent
    ]
})
export class SharedModule {}
