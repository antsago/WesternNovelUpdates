import { firestore } from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects
import { UsersCollection } from './usersCollection'
import { ChaptersCollection } from './chaptersCollection'
import { NovelsCollection } from './novelsCollection'
import { NovelRequestsCollection } from './novelRequestsCollection'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
const REQUESTS = 'novelRequests'

export class DatabaseService
{
    private constructor(public users: UsersCollection,
        public chapters: ChaptersCollection, public novels: NovelsCollection,
        public requests: NovelRequestsCollection) {}

    static createDatabaseService(fs: firestore.Firestore): DatabaseService
    {
        const users = new UsersCollection(fs.collection(USERS))
        const chapters = new ChaptersCollection(fs.collection(CHAPTERS))
        const novels = new NovelsCollection(fs.collection(NOVELS))
        const requests = new NovelRequestsCollection(fs.collection(REQUESTS))
        return new DatabaseService(users, chapters, novels, requests)
    }
}
