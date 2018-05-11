import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ChapterRowComponent } from './chapterRow.component'
import { MissingPageComponent } from './missingPage.component'
import { OnOffButtonComponent } from './onOffButton.component'
import { AlertComponent } from './alert.component'


@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations:
    [
        ChapterRowComponent,
        OnOffButtonComponent,
        MissingPageComponent,
        AlertComponent
    ],
    exports:
    [
        ChapterRowComponent,
        OnOffButtonComponent,
        AlertComponent
    ]
})
export class SharedModule {}
