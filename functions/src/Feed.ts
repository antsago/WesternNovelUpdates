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
        await Promise.all(this.chapters.map(chapter => {return chapterSaver.saveChapter(chapter) })) 

        return this
    }

    private createChapter(chapterXML)
    {
        return {
            novel: this.novel,
            link: chapterXML.link[0],
            publicationDate: chapterXML.pubDate[0],
            title: chapterXML.title[0],
            guid: this.getChapterId(chapterXML)
        }
    }

    private getChapterId(chapterXML) : string
    {
        let guid = this.site !== "RoyalRoad"? chapterXML.guid[0] : chapterXML.guid[0]["_"]
        
        //firebase id cannot cotain the symbols: .$[]#/
        return encodeURIComponent(guid).replace(/\./g, '%2E')
    }
}