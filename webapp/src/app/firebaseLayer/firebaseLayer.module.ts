import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { firestore } from 'firebase'

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
        {
            provide: DatabaseService,
            useFactory: (fs: firestore.Firestore) => DatabaseService.createDatabaseService(fs),
            deps: [firestore.Firestore]
        },
        AuthenticationService
    ]
})
export class FirebaseLayerModule {}

