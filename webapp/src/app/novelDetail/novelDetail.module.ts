import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { CoreModule } from '@app/core'
import { SharedModule } from '@app/shared'
import { NovelDetailComponent } from './novelDetail.component'
import { NovelChaptersComponent } from './novelChapters.component'


@NgModule(
{
    imports:
    [
        CommonModule,
        NgbModule,
        SharedModule
    ],
    declarations:
    [
        NovelDetailComponent,
        NovelChaptersComponent
    ]
})
export class NovelDetailModule {}
