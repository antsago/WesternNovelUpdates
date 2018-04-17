import { User, ListNovel, List } from './Interfaces'
import { firestore } from 'firebase'

const LISTS = 'lists'
const READ_CHAPTERS = 'readChapters'

export class UserCollection
{
    constructor(private uc: firestore.CollectionReference){}

    async getUser(userId: string): Promise<User>
    {
        return (await this.uc.doc(userId).get()).data() as User
    }

    async createUser(userId: string): Promise<void>
    {
        this.uc.doc(userId).set({})
    }

    async getLists(userId: string): Promise<List[]>
    {
        const response = await this.uc.doc(userId).collection(LISTS).get()
        return response.docs.map(list => list.data() as List)
    }

    async addList(userId: string, list: List): Promise<List>
    {
        const listReference = this.uc.doc(userId).collection(LISTS).doc()
        list.listId = listReference.id
        await listReference.set(list)

        return list
    }

    async setDefaultList(userId: string, list: List): Promise<void>
    {
        await this.uc.doc(userId).update({defaultList:
            {listId: list.listId, listName: list.listName}})
    }

    async renameList(userId: string, listId: string, newName: string): Promise<void>
    {
        await this.uc.doc(userId)
            .collection(LISTS).doc(listId).update({listName: newName})
    }

    async deleteList(userId: string, listId: string): Promise<void>
    {
        await this.uc.doc(userId)
            .collection(LISTS).doc(listId).delete()
    }

    async setNovelsOfList(userId: string, novels: ListNovel[], listId: string)
    {
        await this.uc.doc(userId)
            .collection(LISTS).doc(listId).update({novels: novels})
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
