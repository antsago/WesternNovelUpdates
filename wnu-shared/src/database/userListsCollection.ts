import { List, ListNovel } from '../Interfaces'
import { firestore } from 'firebase'

export class UserListsCollection
{
    constructor(private lc: firestore.CollectionReference){}

    async getAll(): Promise<List[]>
    {
        const response = await this.lc.get()
        return response.docs.map(list => list.data() as List)
    }

    async add(list: List): Promise<List>
    {
        const listReference = this.lc.doc()
        list.listId = listReference.id
        await listReference.set(list)

        return list
    }

    async rename(listId: string, newName: string): Promise<void>
    {
        await this.lc.doc(listId).update({listName: newName})
    }

    async delete(listId: string): Promise<void>
    {
        await this.lc.doc(listId).delete()
    }

    async setNovels(novels: ListNovel[], listId: string)
    {
        await this.lc.doc(listId).update({novels: novels})
    }
}
