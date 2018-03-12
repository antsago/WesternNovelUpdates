import * as firebase from 'firebase'
// tslint:disable-next-line:no-import-side-effect - side-effects are necessary for Firebase
import 'firebase/firestore'

export class Database
{
    private readonly ChaptersCol : string = "chapters"
    private readonly NovelsCol : string = "novels"

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
    
    public cleanChapterFields(chapter)
    {
        chapter.publicationDate = new Date(chapter.publicationDate)
        chapter.guid = this.chapterGUID(chapter.novel, chapter.guid)
        
        return chapter
    }
    
    public async saveChapter(chapter)
    {  
        await this.dbConnection.collection(this.ChaptersCol).doc(chapter.guid).set(chapter)
    }
    
    private chapterGUID(novelId, chapterId)
    {
        //firebase id cannot cotain the symbols: .$[]#/
        return `${novelId}-${encodeURIComponent(chapterId).replace(/\./g, '%2E')}`
    }
}