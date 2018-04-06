import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { CoreModule } from '@app/core'
import { NovelsComponent } from '@app/novels/novels.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule,
        CoreModule
    ],
    declarations:
    [
        NovelsComponent
    ]
})
export class NovelsModule {}
