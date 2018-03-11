import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestUpdatesComponent } from './latestUpdates.component'
import { NovelsComponent } from './novels.component'

const appRoutes: Routes =
[
    { path: 'lastestUpdates', component: LatestUpdatesComponent },
    { path: 'novels', component: NovelsComponent },
    { path: '**', redirectTo: '/lastestUpdates'}
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
