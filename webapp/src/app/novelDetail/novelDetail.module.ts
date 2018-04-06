import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CoreModule } from '@app/core'
import { NovelDetailComponent } from '@app/novelDetail/novelDetail.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        NgbModule,
        CoreModule
    ],
    declarations:
    [
        NovelDetailComponent
    ]
})
export class NovelDetailModule {}
