import { Component, Input } from '@angular/core'
import { Novel } from 'wnu-shared'

@Component(
{
    selector: 'wnu-NovelHeader',
    template: `
        <a target="_blank" href="{{novel.homepage}}" class="text-white d-flex flex-row align-items-start">
            <h1 class="h1 font-italic">{{novel.title}}</h1>
            <span class="wnu-tooltip ml-2">
                <i class="fas fa-external-link-alt"></i>
                <span class="wnu-tooltiptext">Go to homepage</span>
            </span>
        </a>
        <p class="lead">by <strong>{{novel.author}}</strong></p>`
})
export class NovelHeaderComponent
{
    @Input() novel: Novel
}
