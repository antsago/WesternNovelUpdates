import { firestore } from 'firebase'
import { Chapter } from '../Interfaces'

const PUBLICATION_DATE = 'publicationDate'
const NOVEL_ID = 'novel'

export class ChaptersCollection
{
    constructor(private cc: firestore.CollectionReference){}

    async getLatests(noOfChapters: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfChapters)
            .get()
        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getLatestsAfter(date: Date, noOfChapters: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfChapters)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getNovelChapters(novelId: string, noOfChapters: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .where(NOVEL_ID, '==', novelId)
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfChapters)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getNovelChaptersAfter(novelId: string, date: Date, noOfChapters: number): Promise<Chapter[]>
    {
        const response = await this.cc
            .where(NOVEL_ID, '==', novelId)
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfChapters)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
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
