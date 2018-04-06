import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NovelsComponent } from './novels/novels.component'
import { ChapterRowComponent } from './chapterRow.component'
import { MissingPageComponent } from './missingPage.component'


@NgModule(
{
    imports:
    [
        FormsModule,
        CommonModule,
        RouterModule,
        NgbModule,
    ],
    declarations:
    [
        ChapterRowComponent,
        NovelsComponent,
        MissingPageComponent
    ],
    exports: [ ChapterRowComponent]
})
export class CoreModule {}
