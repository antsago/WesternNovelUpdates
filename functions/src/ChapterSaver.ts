import * as firebase from 'firebase'
import 'firebase/firestore' //The side-effects are necessary for Firebase

export class ChapterSaver
{
    private readonly NovelsCol : string = "novels"
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

    public async saveChapter(chapter, novel : string)
    {  
        await this.dbConnection.collection(this.NovelsCol).doc(novel)
                    .collection(this.ChaptersCol).doc(chapter.guid).set(chapter) 
    }
}