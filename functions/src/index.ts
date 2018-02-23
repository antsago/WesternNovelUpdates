import * as functions from 'firebase-functions'
import * as firebase from 'firebase'
import 'firebase/firestore' //The side-effects are necessary for Firebase
import * as xml2js from 'xml2js'
import * as keys from './keys'
const util = require('util')
require('util.promisify').shim() // Firebase uses an old version of node (pre v8)

export const updateChapters = functions.https.onRequest(extractAndSaveNewChapters)
    
async function extractAndSaveNewChapters(request, response)
{
    try
    {
        const chapterSaver = new ChapterSaver(keys.API_KEY, keys.AUTH_DOMAIN, keys.PROJECT_ID)
        const feed = new Feed(request.body, request.get("Site"), request.get("Novel-ID"))

        feed.cleanDescriptions()
        let newChapters = feed.extractChapters()
        await chapterSaver.saveChapters(newChapters, request.get("Novel-ID"))
        
        console.info("Successfully added new chapters")

        response.status(200).end()
    }
    catch(error)
    {
        console.error(error)
        response.status(500).end()
    }
}

class Feed
{
    private readonly xmlParser = <(string) => Promise<any>> util.promisify(xml2js.parseString)
    private readonly site : string
    private readonly novel : string
    private rssXML : string

    constructor(rssXML, siteID, novelId)
    {
        this.rssXML = rssXML
        this.site = siteID
        this.novel = novelId
    }

    public cleanDescriptions()
    {
        const descriptionCleaner = /<description>[^]*?<\/description>/gi;
        this.rssXML = this.rssXML.replace(descriptionCleaner, "<description></description>");
    }

    
    public async extractChapters()
    {
        let parsedSite = await this.xmlParser(this.rssXML)
        return parsedSite.rss.channel[0].item.map( chapter => { return this.createChapter(chapter) })
    }

    private createChapter(chapterXML) : Chapter
    {
        let chapter = new Chapter()
        chapter.link = chapterXML.link[0]
        chapter.publicationDate = chapterXML.pubDate[0]
        chapter.title = chapterXML.title[0]

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

class Chapter
{
    link : string
    publicationDate : string
    title : string
    guid : string
}

class ChapterSaver
{
    private readonly dbConnection: firebase.firestore.Firestore;

    constructor(API_KEY, AUTH_DOMAIN, PROJECT_ID)
    {
        if (!firebase.apps.length) 
        {
            firebase.initializeApp(
            {
                apiKey: API_KEY,
                authDomain: AUTH_DOMAIN,
                projectId: PROJECT_ID
            })
        }
        this.dbConnection = firebase.firestore()
    }

    public async saveChapters(chapters, novelId)
    {  
        const chaptersCollection = this.dbConnection.collection("novels").doc(novelId).collection("chapters")
        let saveTasks = chapters.map((chapter) => { return chaptersCollection.doc(chapter.guid).set(chapter) })
        await Promise.all(saveTasks)
    }
}