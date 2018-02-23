import * as xml2js from 'xml2js'
const util = require('util')
require('util.promisify').shim() // Firebase uses an old version of node (pre v8)

export class Feed
{
    private readonly xmlParser = <(string) => Promise<any>> util.promisify(xml2js.parseString)
    private readonly site : string    
    private readonly novel : string

    private rssXML : string
    private chapters : Array<any>

    constructor(rssXML, siteID, novel_Id)
    {
        this.rssXML = rssXML
        this.site = siteID
        this.novel = novel_Id
    }

    public cleanDescriptions()
    {
        const descriptionCleaner = /<description>[^]*?<\/description>/gi
        this.rssXML = this.rssXML.replace(descriptionCleaner, "<description></description>")

        return this
    }

    public async extractChapters()
    {
        let parsedSite = await this.xmlParser(this.rssXML)
        this.chapters = parsedSite.rss.channel[0].item.map( chapter => 
        {
            return this.createChapter(chapter)
        })

        return this
    }

    public async saveChapters(chapterSaver)
    {
        await Promise.all(this.chapters.map(chapter => {return chapterSaver.saveChapter(chapter, this.novel) })) 

        return this
    }

    private createChapter(chapterXML)
    {
        const chapter = 
        {
            link: chapterXML.link[0],
            publicationDate: chapterXML.pubDate[0],
            title: chapterXML.title[0],
            guid: null
        }

        switch(this.site)
        {
            case "GravityTales":
            {
                chapter.guid = chapterXML.guid[0].split("/").reverse()[0]
                break
            }
            case "RoyalRoad":
            {
                chapter.guid = chapterXML.guid[0]["_"]
                break
            }
            default:
            {
                chapter.guid = chapterXML.guid[0]
                break
            }
        }
        return chapter
    }
}