import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService
{
    constructor(private db : AngularFirestore){}
 
    getUpdates(noOfUpdates : number) : Observable<{}[]>
    {
        return this.db.collection("chapters", ref =>
        {
            return ref.orderBy("publicationDate", "desc").limit(noOfUpdates)
        })
        .valueChanges()
    }

    getUpdatesAfter(date : Date, noOfUpdates : number) : Observable<{}[]>
    {
        return this.db.collection("chapters", ref => 
        {
            return ref.orderBy("publicationDate", "desc").startAfter(date).limit(noOfUpdates)
        })
        .valueChanges()
    }
}