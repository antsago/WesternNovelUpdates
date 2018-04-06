import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ReadingListComponent } from '@app/readingList/readingList.component'
import { ListComponent } from '@app/readingList/list.component'
import { NovelListComponent } from '@app/readingList/novelList.component'
import { SharedModule } from '@app/shared'

@NgModule(
{
    imports:
    [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        SharedModule
    ],
    declarations:
    [
        ReadingListComponent,
        ListComponent,
        NovelListComponent
    ]
})
export class ReadingListModule {}
