import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '@app/shared'

import { AddNovelComponent } from './addNovel.component'
import { ViewNovelRequestsComponent } from './viewNovelRequests.component'
import { NovelRequestsService } from './novelRequests.service'
import { NovelRequestComponent } from './novelRequest.component'

@NgModule(
{
    imports:
    [
        CommonModule,
        NgbModule,
        FormsModule,
        SharedModule
    ],
    providers: [ NovelRequestsService ],
    declarations:
    [
        AddNovelComponent,
        ViewNovelRequestsComponent,
        NovelRequestComponent
    ],
    entryComponents:
    [
        AddNovelComponent,
        ViewNovelRequestsComponent
    ]
})
export class NovelRequestsModule {}
