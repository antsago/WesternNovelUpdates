import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { ChapterRowComponent } from './chapterRow.component'
import { MissingPageComponent } from './missingPage.component'


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
        MissingPageComponent
    ],
    exports: [ ChapterRowComponent ]
})
export class CoreModule {}
