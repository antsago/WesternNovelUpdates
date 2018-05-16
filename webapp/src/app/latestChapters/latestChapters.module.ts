import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { SharedModule } from '@app/shared'
import { LatestChaptersComponent } from './latestChapters.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        SharedModule,
        InfiniteScrollModule
    ],
    declarations:
    [
        LatestChaptersComponent
    ]
})
export class LatestChaptersModule {}
