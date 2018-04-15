import { Component, Input } from '@angular/core'
import { NovelRequest } from '@app/core'

@Component(
{
    selector: 'wnu-novelrequest',
    templateUrl: './novelRequest.component.html'
})
export class NovelRequestComponent
{
    @Input() request: NovelRequest
    errorMessage = ''
    alertClosed = true

    private validateNovelRequest()
    {
        this.request =
        {
            title: this.request.title.trim(),
            author: this.request.author.trim(),
            synopsis: this.request.synopsis.trim(),
            homepage: this.request.homepage.trim(),
            rssFeed: this.request.rssFeed.trim()
        }
        if (!this.request.title || !this.request.author || !this.request.synopsis
            || !this.request.homepage || !this.request.rssFeed)
        {
            throw new Error('All novel requests fields must be filled')
        }
    }
}
