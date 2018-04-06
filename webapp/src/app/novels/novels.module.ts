import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { NovelsComponent } from '@app/novels/novels.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule,
    ],
    declarations:
    [
        NovelsComponent
    ]
})
export class NovelsModule {}
