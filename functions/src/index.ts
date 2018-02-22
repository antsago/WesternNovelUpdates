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
        let feed = cleanDescriptions(request.body) 
        let chapters = await extractChapters(feed)
        await saveChapters(chapters)

        console.info("Successfully added new chapters")
        response.status(200).end()
    }
    catch(error)
    {
        console.error(error)
        response.status(500).end()
    }
}

function cleanDescriptions(rssXML) 
{
    const descriptionCleaner = /<description>[^]*?<\/description>/gi;
    return rssXML.replace(descriptionCleaner, "<description></description>");
}

async function extractChapters(rssXML) : Promise<Array<any>>
{
    const parseXML = <(rssxML) => Promise<any>> util.promisify(xml2js.parseString)
    
    let parsedSite = await parseXML(rssXML)
    return parsedSite.rss.channel[0].item.map((ch) => 
    {
        return {
            link: ch.link[0], 
            publicationDate: ch.pubDate[0], 
            title: ch.title[0],
            guid: ch.guid[0]["_"]
        }
    })
}

async function saveChapters(chapters)
{  
    const chaptersCollection = initializeDb().collection("chapters")
    let saveTasks = chapters.map((chapter) => { return chaptersCollection.doc(chapter.guid).set(chapter) })
    await Promise.all(saveTasks)
}

function initializeDb() : firebase.firestore.Firestore
{
    if (!firebase.apps.length) 
    {
        firebase.initializeApp(
        {
            apiKey: keys.API_KEY,
            authDomain: keys.AUTH_DOMAIN,
            projectId: keys.PROJECT_ID
        })
    }
    return firebase.firestore()
}