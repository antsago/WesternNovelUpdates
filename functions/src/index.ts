import { https } from 'firebase-functions'
import * as fr from 'firebase'

import { Feed } from './Feed'
import { Database } from './Database'
import { Token, AdminCredentials, DatabaseURL } from './keys'

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

        const database = new Database(AdminCredentials, DatabaseURL)

        await (await new Feed(request.body, request.get("Site"), request.get("Novel-ID"), database)
                            .cleanDescriptions()
                            .extractChapters())
                            .saveChapters()
        
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