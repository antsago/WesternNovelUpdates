import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'

@Component(
{
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit
{
    updates: {}[]

    constructor(private db : AngularFirestore){}

    ngOnInit()
    {
        this.db.collection("chapters", ref =>
        {
            return ref.orderBy("publicationDate", "desc").limit(10)  
        }).valueChanges().subscribe(updates =>
        {
            this.updates = updates
        })
    }
    
    getMoreUpdates()
    {
        const lastDate = this.updates[9]["publicationDate"]
        
        this.db.collection("chapters", ref => 
        {
            return ref.orderBy("publicationDate", "desc").startAfter(lastDate).limit(10)
        })
        .valueChanges().subscribe(newUpdates => 
        {
            this.updates = [...this.updates, ...newUpdates]
        })
    }
}
