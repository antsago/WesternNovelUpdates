import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { CoreModule } from '@app/core'
import { SharedModule } from '@app/shared'
import { NovelDetailComponent } from './novelDetail.component'
import { NovelChaptersComponent } from './novelChapters.component'
import { NovelDetailListMenuComponent } from './novelDetailListMenu.component'
import { NovelSynopsisComponent } from './novelSynopsis.component'
import { NovelHeaderComponent } from './novelHeader.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        NgbModule,
        SharedModule,
        InfiniteScrollModule
    ],
    declarations:
    [
        NovelDetailComponent,
        NovelChaptersComponent,
        NovelSynopsisComponent,
        NovelDetailListMenuComponent,
        NovelHeaderComponent
    ]
})
export class NovelDetailModule {}
