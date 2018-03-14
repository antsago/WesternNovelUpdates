import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
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

    async getUpdates(noOfUpdates: number): Promise<firebase.firestore.DocumentData[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfUpdates)
            .get()
        return response.docs.map(doc => doc.data())
    }

    async getUpdatesAfter(date: Date, noOfUpdates: number): Promise<firebase.firestore.DocumentData[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfUpdates)
            .get()

        return response.docs.map(doc => doc.data())
    }

    async getNovels(): Promise<firebase.firestore.DocumentData[]>
    {
        const response = await this.fs.collection(NOVELS)
            .orderBy(TITLE, 'asc')
            .get()
        return response.docs.map(novel =>
        {
            return { id: novel.id, ...novel.data() }
        })
    }

    async getNovel(novelId: string): Promise<firebase.firestore.DocumentData>
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

    async getUser(userId: string): Promise<firebase.firestore.DocumentData>
    {
        return (await this.fs.collection(USERS).doc(userId).get()).data()
    }
}
