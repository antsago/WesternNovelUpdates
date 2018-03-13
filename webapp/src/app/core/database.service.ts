import { Injectable } from '@angular/core'
import * as fb from 'firebase'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const PUBLICATION_DATE = 'publicationDate'
const TITLE = 'title'
const NOVEL_ID = 'novel'


@Injectable()
export class DatabaseService
{
    private readonly fs: fb.firestore.Firestore

    constructor()
    {
        this.fs = fb.firestore()
    }

    async getUpdates(noOfUpdates: number): Promise<{}[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfUpdates)
            .get()
        return response.docs.map(doc => doc.data())
    }

    async getUpdatesAfter(date: Date, noOfUpdates: number): Promise<{}[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfUpdates)
            .get()

        return response.docs.map(doc => doc.data())
    }

    async getNovels(): Promise<{}[]>
    {
        const response = await this.fs.collection(NOVELS)
            .orderBy(TITLE, 'asc')
            .get()
        return response.docs.map(novel =>
        {
            return { id: novel.id, ...novel.data() }
        })
    }

    async getNovel(novelId: string): Promise<{}>
    {
        const novel = (await this.fs.collection(NOVELS).doc(novelId).get()).data()
        novel.chapters = (await this.fs.collection(CHAPTERS)
            .where(NOVEL_ID, '==', novelId)
            .get())
            .docs.map(snap =>
            {
                return snap.data()
            })
        return novel
    }
}
