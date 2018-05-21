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
import { BookmarkComponent } from './bookmark.component'


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
        ConfirmPasswordComponent,
        OnOffButtonComponent,
        MissingPageComponent,
        ChapterRowComponent,
        BookmarkComponent,
        AlertComponent
    ],
    exports:
    [
        ConfirmPasswordComponent,
        OnOffButtonComponent,
        ChapterRowComponent,
        BookmarkComponent,
        AlertComponent
    ]
})
export class SharedModule {}
