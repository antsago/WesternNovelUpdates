import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { firestore, auth } from 'firebase'

import { DatabaseService } from './database.service'
import { AuthenticationService } from './authentication.service'

@NgModule(
{
    imports:
    [
        CommonModule
    ],
    providers:
    [
        {provide: firestore.Firestore, useFactory: () => firestore()},
        {provide: auth.Auth, useFactory: () => auth()},
        {
            provide: DatabaseService,
            useFactory: (fs: firestore.Firestore) => DatabaseService.createDatabaseService(fs),
            deps: [firestore.Firestore]
        },
        {
            provide: AuthenticationService,
            useFactory: (fa: auth.Auth) => new AuthenticationService(fa),
            deps: [auth.Auth]
        }
    ]
})
export class FirebaseLayerModule {}

