import * as firebase from 'firebase'
import 'firebase/firestore' //The side-effects are necessary for Firebase

export class ChapterSaver
{
    private readonly ChaptersCol : string = "chapters"

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

    public async saveChapter(chapter)
    {  
        await this.dbConnection.collection(this.ChaptersCol).doc(`${chapter.novel}-${chapter.guid}`).set(chapter)
    }
}