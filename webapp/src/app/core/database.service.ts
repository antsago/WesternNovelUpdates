import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const PUBLICATION_DATE = 'publicationDate'
const TITLE = 'title'


@Injectable()
export class DatabaseService
{
    constructor(private db: AngularFirestore) {}

    getUpdates(noOfUpdates: number): Observable<{}[]>
    {
        return this.db.collection(CHAPTERS, ref =>
        {
            return ref.orderBy(PUBLICATION_DATE, 'desc').limit(noOfUpdates)
        })
        .valueChanges()
    }

    getUpdatesAfter(date: Date, noOfUpdates: number): Observable<{}[]>
    {
        return this.db.collection(CHAPTERS, ref =>
        {
            return ref.orderBy(PUBLICATION_DATE, 'desc').startAfter(date).limit(noOfUpdates)
        })
        .valueChanges()
    }

    getNovels(): Observable<{}[]>
    {
        return this.db.collection(NOVELS, ref =>
        {
            return ref.orderBy(TITLE, 'asc')
        })
        .snapshotChanges().map(novels =>
        {
            return novels.map(novel =>
            {
                const id = novel.payload.doc.id
                const data = novel.payload.doc.data()
                return { id, ...data}
            })
        })
    }

    getNovel(novelId: string): Observable<{}>
    {
        return this.db.collection(NOVELS).doc(novelId).valueChanges()
    }
}
