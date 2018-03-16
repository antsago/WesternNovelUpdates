export class Database
{
    private readonly ChaptersCol : string = "chapters"

    constructor(private readonly dbConnection: FirebaseFirestore.Firestore) {}

    public async saveChapters(chapters)
    {
        await Promise.all(chapters.map(chapter =>
        { 
            return this.saveChapter(chapter)
        })) 

        return this
    }

    public async saveChapter(chapter)
    {  
        await this.dbConnection.collection(this.ChaptersCol).doc(chapter.guid).set(chapter)
    }
}