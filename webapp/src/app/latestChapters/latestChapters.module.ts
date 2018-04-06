import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoreModule } from '@app/core'
import { LatestChaptersComponent } from '@app/latestChapters/latestChapters.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        CoreModule
    ],
    declarations:
    [
        LatestChaptersComponent
    ]
})
export class LatestChaptersModule {}
