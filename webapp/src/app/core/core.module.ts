import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NovelsComponent } from './novels/novels.component'
import { NovelDetailComponent } from './novelDetail/novelDetail.component'
import { ChapterRowComponent } from './chapterRow.component'
import { ReadingListComponent } from './readingList/readingList.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelListComponent } from './readingList/novelList.component'
import { ListComponent } from './readingList/list.component'


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
        NovelDetailComponent,
        ReadingListComponent,
        ListComponent,
        NovelListComponent,
        MissingPageComponent
    ],
    exports: [ ChapterRowComponent]
})
export class CoreModule {}
