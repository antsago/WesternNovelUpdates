import { Feed } from './Feed'

export class RedditFeed extends Feed
{
    constructor(protected feed: string|any, protected readonly novel: string, protected readonly author: string)
    {
        super(feed, novel)
    }

    cleanFeed(): RedditFeed
    {
        this.cleanContent()
        return this
    }

    extractChapters(): RedditFeed
    {
        this.chapters = this.feed.feed.entry
        return this
    }

    extractChaptersFields(): RedditFeed
    {
        this.chapters = this.chapters.map(chapter =>
        {
            return {
                novel: this.novel,
                link: chapter.link[0].$.href,
                publicationDate: chapter.updated[0],
                title: chapter.title[0],
                guid: chapter.id[0]
            }
        })
        return this
    }

    private cleanContent()
    {
        const content = /<content type="html">[^]*?<\/content>/gi
        this.feed = this.feed.replace(content, '<content></content>')
    }
}

