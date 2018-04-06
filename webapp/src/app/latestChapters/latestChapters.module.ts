import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LatestChaptersComponent } from '@app/latestChapters/latestChapters.component'
import { SharedModule } from '@app/shared'

@NgModule(
{
    imports:
    [
        CommonModule,
        SharedModule
    ],
    declarations:
    [
        LatestChaptersComponent
    ]
})
export class LatestChaptersModule {}
