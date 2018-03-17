import { Feed } from "./Feed"

export class SufficientVelocityFeed extends Feed
{
    constructor(protected feed: string|any, protected readonly novel: string, protected readonly threadId: string)
    {
        super(feed, novel)
    }
    
    public extractChapters(): SufficientVelocityFeed
    {
        super.extractChapters()
        this.chapters = this.chapters.filter(ch =>
        {
            return ch.guid[0].includes(this.threadId)
        })
        return this
    }

    public extractChaptersFields(): SufficientVelocityFeed
    {
        this.chapters = this.chapters.map(chapter =>
        {
            return {
                novel: this.novel,
                link: chapter.link[0],
                publicationDate: chapter.pubDate[0],
                title: chapter['slash:comments'][0],
                guid: `${chapter.guid[0]}${chapter['slash:comments'][0]}`
            }
        })
        return this
    }
}