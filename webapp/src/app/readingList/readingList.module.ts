import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { CoreModule } from '@app/core'
import { ReadingListComponent } from '@app/readingList/readingList.component'
import { ListComponent } from '@app/readingList/list.component'
import { NovelListComponent } from '@app/readingList/novelList.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        CoreModule
    ],
    declarations:
    [
        ReadingListComponent,
        ListComponent,
        NovelListComponent
    ]
})
export class ReadingListModule {}
