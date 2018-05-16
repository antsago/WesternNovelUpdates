import { firestore } from 'firebase'
import { Chapter } from '../Interfaces'

const PUBLICATION_DATE = 'publicationDate'
const NOVEL_ID = 'novel'

export class ChaptersCollection
{
    constructor(private cc: firestore.CollectionReference){}

    async getLatests(noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfUpdates)
            .get()
        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getLastChapterOfNovel(novelId: string): Promise<Chapter>
    {
        const response = await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .where(NOVEL_ID, '==', novelId)
            .limit(1)
            .get()
        return response.docs.map(doc => doc.data() as Chapter)[0]
    }

    async getLatestsAfter(date: Date, noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfUpdates)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getNovelChapters(novelId: string): Promise<Chapter[]>
    {
        return (await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .where(NOVEL_ID, '==', novelId)
            .get())
            .docs.map(snap =>
            {
                return snap.data() as Chapter
            })
    }

    async saveAll(chapters: Chapter[]): Promise<void>
    {
        await Promise.all(chapters.map(chapter =>
        { 
            return this.save(chapter)
        }))
    }

    async save(chapter: Chapter): Promise<void>
    {  
        await this.cc.doc(chapter.guid).set(chapter)
    }
}
