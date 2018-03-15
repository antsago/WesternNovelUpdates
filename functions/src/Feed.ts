import * as xml2js from 'xml2js'
const util = require('util')
require('util.promisify').shim() // Firebase uses an old version of node (pre v8)

import { Database } from './Database'

export class Feed
{
    private readonly xmlParser = <(string) => Promise<any>> util.promisify(xml2js.parseString)
    private readonly site : string    
    private readonly novel : string
    private readonly database : Database

    private rssXML : string
    private chapters : Array<any>

    constructor(rssXML : string, siteID : string, novel_Id : string, database : Database)
    {
        this.rssXML = rssXML
        this.site = siteID
        this.novel = novel_Id
        this.database = database
    }

    public cleanDescriptions()
    {
        const descriptionCleaner = /<description>[^]*?<\/description>/gi
        this.rssXML = this.rssXML.replace(descriptionCleaner, "<description></description>")

        return this
    }

    public async extractChapters()
    {
        const parsedSite = await this.xmlParser(this.rssXML)
        this.chapters = parsedSite.rss.channel[0].item.map( chapter => 
        {
            return this.createChapter(chapter)
        })

        return this
    }

    public async saveChapters()
    {
        await Promise.all(this.chapters.map( chapter =>
        { 
            return this.database.saveChapter(chapter)
        })) 

        return this
    }

    private createChapter(chapterXML)
    {
        return this.database.cleanChapterFields( 
        {
            novel: this.novel,
            link: chapterXML.link[0],
            publicationDate: chapterXML.pubDate[0],
            title: chapterXML.title[0],
            guid: this.site !== "RoyalRoad"? chapterXML.guid[0] : chapterXML.guid[0]["_"]
        })
    }
}