import { firestore } from 'firebase'
import { Chapter } from './Interfaces'

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
}
