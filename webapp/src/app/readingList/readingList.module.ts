import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SharedModule } from '@app/shared'
import { ReadingListComponent } from './readingList.component'
import { ListComponent } from './list.component'
import { NovelListComponent } from './novelList.component'
import { NovelListMenuComponent } from './novelListMenu.component'
import { ListMenuComponent } from './listMenu.component'

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
        NovelListComponent,
        NovelListMenuComponent,
        ListMenuComponent
    ]
})
export class ReadingListModule {}
