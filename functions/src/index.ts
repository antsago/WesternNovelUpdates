import { https } from 'firebase-functions'

import { Feed } from './Feed'
import { ChapterSaver } from './ChapterSaver'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID} from './keys'

export const updateChapters = https.onRequest( async (request, response) =>
{
    try
    {
        const chapterSaver = new ChapterSaver(API_KEY, AUTH_DOMAIN, PROJECT_ID)
        
        await (await new Feed(request.body, request.get("Site"), request.get("Novel-ID"))
                            .cleanDescriptions()
                            .extractChapters())
                            .saveChapters(chapterSaver)
        
        console.info("Successfully added new chapters")
        response.status(200).end()
    }
    catch(error)
    {
        console.error(error)
        response.status(500).end()
    }
})