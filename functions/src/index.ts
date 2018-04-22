import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Token, AdminCredentials, DatabaseURL } from './keys'
import { FeedFactory } from './FeedFactory'
import { DatabaseService } from 'wnu-shared'

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

        const feed = FeedFactory.createFeed(request.body, request.get("Site"), 
                                        request.get("Novel-ID"), request.get("Categories"),
                                        request.get("ThreadId"))
        
        const chapters = (await feed.cleanFeed()
                                    .parseFeed())
                                    .extractChapters()
                                    .extractChaptersFields()
                                    .cleanChapterFields()
                                    .chapters

        const database = DatabaseService.createDatabaseService(admin.firestore() as any)
        await database.chapters.saveAll(chapters)
        
        console.info("Successfully added new chapters")
        response.status(200).end()
    }
    catch(error)
    {
        if(error instanceof Error) 
        {
            console.error(`Error for novel ${request.get("Novel-ID")} from site ${request.get("Site")}`);
            console.error(error);
        } 
        else 
        {
            console.error(new Error(`Error for novel ${request.get("Novel-ID")} from site ${request.get("Site")}: ${error}`));
        }
    
        response.status(500).end()
    }
})
