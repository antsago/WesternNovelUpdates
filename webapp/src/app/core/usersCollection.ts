import { User, ListNovel, List } from './Interfaces'
import { UserListsCollection } from './userListsCollection'
import { firestore } from 'firebase'

const LISTS = 'lists'
const READ_CHAPTERS = 'readChapters'

export class UsersCollection
{
    constructor(private uc: firestore.CollectionReference){}

    lists(userId: string): UserListsCollection
    {
        return new UserListsCollection(this.uc.doc(userId).collection(LISTS))
    }

    async getUser(userId: string): Promise<User>
    {
        return (await this.uc.doc(userId).get()).data() as User
    }

    async createUser(userId: string): Promise<void>
    {
        this.uc.doc(userId).set({})
    }

    async setDefaultList(userId: string, list: List): Promise<void>
    {
        await this.uc.doc(userId).update({defaultList:
            {listId: list.listId, listName: list.listName}})
    }

    async getReadChapters(userId: string): Promise<string[]>
    {
        const response = await this.uc.doc(userId).collection(READ_CHAPTERS).get()
        return response.docs.map(chapter => chapter.id)
    }

    async addReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.uc.doc(userId).collection(READ_CHAPTERS).doc(chapterId).set({})
    }

    async removeReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.uc.doc(userId).collection(READ_CHAPTERS).doc(chapterId).delete()
    }
}
