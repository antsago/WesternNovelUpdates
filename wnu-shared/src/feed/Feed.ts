import * as xml2js from 'xml2js'
const util = require('util')
require('util.promisify').shim() // Firebase uses an old version of node (pre v8)

export class Feed
{
    protected static xmlParser = <(string) => Promise<any>> util.promisify(xml2js.parseString)
    public chapters: any[]

    constructor(protected feed: string|any, protected readonly novel: string){}

    public cleanFeed(): Feed
    {
        this.cleanDescription()
        this.cleanPermalink()
        return this
    }

    public async parseFeed(): Promise<Feed>
    {
        this.feed = await Feed.xmlParser(this.feed)
        return this
    }

    public extractChapters(): Feed
    {
        this.chapters = this.feed.rss.channel[0].item
        return this
    }

    public extractChaptersFields(): Feed
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
    
    public cleanChapterFields(): Feed
    {
        this.chapters = this.chapters.map(chapter =>
        {
            chapter.publicationDate = new Date(chapter.publicationDate)
            //firebase id cannot cotain the symbols: .$[]#/
            chapter.guid = `${chapter.novel}-${encodeURIComponent(chapter.guid).replace(/\./g, '%2E')}`

            return chapter
        })
        return this
    }

    private cleanDescription()
    {
        const description = /<description>[^]*?<\/description>/gi
        this.feed = this.feed.replace(description, '<description></description>')
    }

    private cleanPermalink()
    {
        const permalink = /<guid isPermaLink=".*?">/gi
        this.feed = this.feed.replace(permalink, '<guid>')
    }
}

