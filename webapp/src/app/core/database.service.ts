import { Injectable } from '@angular/core'
import { firestore } from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects
import { Novel, Chapter, User, List, ListNovel, NovelRequest } from './Interfaces'
import { UsersCollection } from './usersCollection'
import { ChaptersCollection } from './chaptersCollection'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
const NOVEL_REQUESTS = 'novelRequests'
const TITLE = 'title'

@Injectable()
export class DatabaseService
{
    private constructor(private readonly fs: firestore.Firestore, public users: UsersCollection,
        public chapters: ChaptersCollection)
    {}

    static createDatabaseService(fs: firestore.Firestore)
    {
        const users = new UsersCollection(fs.collection(USERS))
        const chapters = new ChaptersCollection(fs.collection(CHAPTERS))
        return new DatabaseService(fs, users, chapters)
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
