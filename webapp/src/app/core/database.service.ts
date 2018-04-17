import { Injectable } from '@angular/core'
import { firestore } from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects
import { Novel, Chapter, User, List, ListNovel, NovelRequest } from './Interfaces'
import { UsersCollection } from './usersCollection'
import { ChaptersCollection } from './chaptersCollection'
import { NovelsCollection } from './novelsCollection'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
const NOVEL_REQUESTS = 'novelRequests'

@Injectable()
export class DatabaseService
{
    private constructor(private readonly fs: firestore.Firestore, public users: UsersCollection,
        public chapters: ChaptersCollection, public novels: NovelsCollection)
    {}

    static createDatabaseService(fs: firestore.Firestore)
    {
        const users = new UsersCollection(fs.collection(USERS))
        const chapters = new ChaptersCollection(fs.collection(CHAPTERS))
        const novels = new NovelsCollection(fs.collection(NOVELS))
        return new DatabaseService(fs, users, chapters, novels)
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
}
