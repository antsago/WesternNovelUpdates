import { Component } from '@angular/core'

@Component(
{
    template: `<div class="jumbotron text-center">
    <h1>This page is missing:</h1>
    <img style="width:60vw;height:45vh;" src="assets/book-missing-page.svg"/>
    <p>Someone stole it? <a href="mailto:tbd@tobedecided.com">Report it</a></p>
    </div>`
})
export class MissingPageComponent {}
