import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestUpdatesComponent } from './core/latestUpdates.component'
import { NovelsComponent } from './core/novels.component'
import { MissingPageComponent } from './missingPage.component'
import { NovelDetailComponent } from './core/novelDetail.component'

const appRoutes: Routes =
[
    { path: 'latestUpdates', component: LatestUpdatesComponent },
    { path: 'novels', component: NovelsComponent },
    { path: 'novels/:id', component: NovelDetailComponent },
    { path: '', redirectTo: '/latestUpdates', pathMatch: 'full'},
    { path: '**', component: MissingPageComponent }
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
