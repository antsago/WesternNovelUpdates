import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LatestUpdatesComponent } from './latestUpdates.component'

const appRoutes: Routes =
[
    { path: 'lastestUpdates', component: LatestUpdatesComponent },
    { path: 'novels', component: LatestUpdatesComponent },
    { path: '', redirectTo: '/lastestUpdates', pathMatch: 'full' },
    { path: '**', component: LatestUpdatesComponent }
]

@NgModule(
{
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
