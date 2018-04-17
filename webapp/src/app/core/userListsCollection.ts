import { List, ListNovel } from './Interfaces'
import { firestore } from 'firebase'

export class UserListsCollection
{
    constructor(private lc: firestore.CollectionReference){}

    async getLists(userId: string): Promise<List[]>
    {
        const response = await this.lc.get()
        return response.docs.map(list => list.data() as List)
    }

    async addList(userId: string, list: List): Promise<List>
    {
        const listReference = this.lc.doc()
        list.listId = listReference.id
        await listReference.set(list)

        return list
    }

    async renameList(userId: string, listId: string, newName: string): Promise<void>
    {
        await this.lc.doc(listId).update({listName: newName})
    }

    async deleteList(userId: string, listId: string): Promise<void>
    {
        await this.lc.doc(listId).delete()
    }

    async setNovelsOfList(userId: string, novels: ListNovel[], listId: string)
    {
        await this.lc.doc(listId).update({novels: novels})
    }
}
