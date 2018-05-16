import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Token, AdminCredentials, DatabaseURL } from './keys'
import { DatabaseService, FeedFactory } from 'wnu-shared'

export const updateChapters = https.onRequest( async (request, response) =>
{
    try
    {
        if(request.get('Token') !== Token)
        {
            console.warn("Unauthorized http request")
            response.status(401).end()
            return
        }

        if (!admin.apps.length)
        {
            admin.initializeApp(
            {
                credential: admin.credential.cert(AdminCredentials),
                databaseURL: DatabaseURL
            })
        }

        const body = JSON.parse(request.body)
        const feed = FeedFactory.createFeed(body.feed, body.novel)

        const database = DatabaseService.createDatabaseService(admin.firestore() as any)
        const latestChapter = await database.chapters.getNovelChapters(body.novel.id, 1)[0]
        
        const chapters = (await feed.cleanFeed()
                                    .parseFeed())
                                    .extractChapters()
                                    .extractChaptersFields()
                                    .cleanChapterFields()
                                    .chapters
                                    .filter(ch => !latestChapter || ch.publicationDate > latestChapter.publicationDate)

        await database.chapters.saveAll(chapters)
        
        console.info(`Successfully updated "${body.novel.title}"`)
        response.status(200).end()
    }
    catch(error)
    {
        if(error instanceof Error) 
        {
            console.error(`Error for: ${request.body}`)
            console.error(error);
        } 
        else 
        {
            console.error(new Error(`Error for: ${request.body}`))
        }
    
        response.status(500).end()
    }
})
