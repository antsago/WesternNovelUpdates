import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Database } from './Database'
import { Token, AdminCredentials, DatabaseURL } from './keys'
import { FeedFactory } from './FeedFactory'

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

        const database = new Database(admin.firestore())
        await database.saveChapters(chapters)
        
        console.info("Successfully added new chapters")
        response.status(200).end()
    }
    catch(error)
    {
        if(error instanceof Error) 
        {
            console.error(error);
        } 
        else 
        {
            console.error(new Error(`Error: ${error}`));
        }
    
        response.status(500).end()
    }
})
