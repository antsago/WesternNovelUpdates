import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { ChapterRowComponent } from './chapterRow.component'
import { MissingPageComponent } from './missingPage.component'
import { OnOffButtonComponent } from './onOffButton.component'


@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule
    ],
    declarations:
    [
        ChapterRowComponent,
        OnOffButtonComponent,
        MissingPageComponent
    ],
    exports:
    [
        ChapterRowComponent,
        OnOffButtonComponent
    ]
})
export class SharedModule {}
