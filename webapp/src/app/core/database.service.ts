import { Injectable } from '@angular/core'
import { firestore } from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects
import { Novel, Chapter, User, List, ListNovel, NovelRequest } from './Interfaces'
import { UserCollection } from './userCollection'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
const NOVEL_REQUESTS = 'novelRequests'
const PUBLICATION_DATE = 'publicationDate'
const TITLE = 'title'
const NOVEL_ID = 'novel'

@Injectable()
export class DatabaseService
{
    private constructor(private readonly fs: firestore.Firestore, public users: UserCollection)
    {}

    static createDatabaseService(fs: firestore.Firestore)
    {
        const users = new UserCollection(fs.collection(USERS))
        return new DatabaseService(fs, users)
    }
    async getUpdates(noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfUpdates)
            .get()
        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getUpdatesAfter(date: Date, noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfUpdates)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getAllNovels(): Promise<Novel[]>
    {
        const response = await this.fs.collection(NOVELS)
            .orderBy(TITLE, 'asc')
            .get()
        return response.docs.map(novel => novel.data() as Novel)
    }

    async getNovel(novelId: string): Promise<Novel>
    {
        return (await this.fs.collection(NOVELS).doc(novelId).get()).data() as Novel
    }

    async getNovelChapters(novelId: string): Promise<Chapter[]>
    {
        return (await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .where(NOVEL_ID, '==', novelId)
            .get())
            .docs.map(snap =>
            {
                return snap.data() as Chapter
            })
    }

    async addNovelRequest(request: NovelRequest): Promise<void>
    {
        const requestReference = this.fs.collection(NOVEL_REQUESTS).doc()
        request.id = requestReference.id
        await requestReference.set(request)
    }

    async getNovelRequests(): Promise<NovelRequest[]>
    {
        const response = await this.fs.collection(NOVEL_REQUESTS).get()
        return response.docs.map(nr => nr.data() as NovelRequest)
    }

    async deleteNovelRequest(request: NovelRequest): Promise<void>
    {
        await this.fs.collection(NOVEL_REQUESTS).doc(request.id).delete()
    }

    async addNovel(novel: Novel): Promise<void>
    {
        const novelReference = this.fs.collection(NOVELS).doc()
        novel.id = novelReference.id
        await novelReference.set(novel)
    }
}
