import { Component } from '@angular/core';

@Component(
{
    selector: 'app-root',
    template: `
    <ul>
        <li *ngFor="let update of updates">
            <p>{{update.novelTitle}}: {{update.chapterTitle}}</p>
            <p>{{update.publicationDate}}</p>
        </li>
    </ul>`
})
export class AppComponent 
{
    updates = 
    [
        {
            novelTitle: "My novel",
            chapterTitle: "A new chapter",
            publicationDate: "Today"
        },
        {
            novelTitle: "My second novel",
            chapterTitle: "Another chapter",
            publicationDate: "Yesterday"
        }
    ]
}
