import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AddNovelComponent } from './addNovel.component'
import { ViewNovelRequestsComponent } from './viewNovelRequests.component'
import { NovelRequestsService } from './novelRequests.service'

@NgModule(
{
    imports:
    [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    providers: [ NovelRequestsService ],
    declarations:
    [
        AddNovelComponent,
        ViewNovelRequestsComponent
    ],
    entryComponents:
    [
        AddNovelComponent,
        ViewNovelRequestsComponent
    ]
})
export class NovelRequestsModule {}
