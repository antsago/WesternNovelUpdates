import * as admin from 'firebase-admin'

export class Database
{
    private readonly ChaptersCol : string = "chapters"

    private readonly dbConnection: FirebaseFirestore.Firestore;

    constructor(adminCredentials, databaseUrl)
    {
        if (!admin.apps.length) 
        {
            admin.initializeApp(
            {
                credential: admin.credential.cert(adminCredentials),
                databaseURL: databaseUrl
            })
        }
        this.dbConnection = admin.firestore()
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