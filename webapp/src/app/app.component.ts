import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

@Component(
{
    selector: 'app-root',
    template: `
    <ul>
        <li *ngFor="let update of updates | async">
            
            <p>{{update.publicationDate}}: <a href="{{update.link}}">{{update.title}}</a></p>
        </li>
    </ul>`
})
export class AppComponent implements OnInit
{
    updates: Observable<any[]>

    constructor(private db : AngularFirestore){}

    ngOnInit()
    {
        this.updates = this.db.collection("chapters", ref => ref.orderBy("publicationDate", "desc").limit(10)).valueChanges()
    }
}
