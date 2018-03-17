import { Feed } from "./Feed"

export class NoPermalinkFeed extends Feed
{
    constructor(protected feed: string|any, protected readonly novel: string)
    {
        super(feed, novel)
    }
    
    public extractChaptersFields(): NoPermalinkFeed
    {
        this.chapters = this.chapters.map(chapter =>
        {
            return {
                novel: this.novel,
                link: chapter.link[0],
                publicationDate: chapter.pubDate[0],
                title: chapter.title[0],
                guid: chapter.guid[0]
            }
        })

        return this
    }
}