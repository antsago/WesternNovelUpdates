import { Feed } from "./Feed"

export class QuidianFeed extends Feed
{
    constructor(protected feed: string|any, protected readonly novel: string, protected readonly bookId: string)
    {
        super(feed, novel)
    }
    
    public extractChapters(): QuidianFeed
    {
        super.extractChapters()
        this.chapters = this.chapters.filter(ch =>
        {
            return ch.link[0].includes(this.bookId)
        })
        return this
    }

    public extractChaptersFields(): QuidianFeed
    {
        const chapterIdRegex = /^https:\/\/www.webnovel.com\/rssbook\/\d+\/(\d+)\/.*/i

        this.chapters = this.chapters.map(chapter =>
        {
            const chapterId = chapter.link[0].match(chapterIdRegex)[0]
            return {
                novel: this.novel,
                link: `https://www.webnovel.com/book/${this.bookId}/${chapterId}/`,
                publicationDate: chapter.pubDate[0],
                title: chapter.title,
                guid: chapterId
            }
        })
        return this
    }
}