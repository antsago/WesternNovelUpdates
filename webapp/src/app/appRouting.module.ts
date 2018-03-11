import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestUpdatesComponent } from './latestUpdates.component'
import { NovelsComponent } from './novels.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelDetailComponent } from './novelDetail.component'

const appRoutes: Routes =
[
    { path: 'lastestUpdates', component: LatestUpdatesComponent },
    { path: 'novels', component: NovelsComponent },
    { path: 'novels/:id', component: NovelDetailComponent },
    { path: '', redirectTo: '/lastestUpdates', pathMatch: 'full'},
    { path: '**', component: MissingPageComponent }
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
