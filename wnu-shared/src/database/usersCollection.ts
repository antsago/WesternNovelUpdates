import { User, List, Bookmark } from '../Interfaces'
import { UserListsCollection } from './userListsCollection'
import { firestore } from 'firebase'

const LISTS = 'lists'

export class UsersCollection
{
    constructor(private uc: firestore.CollectionReference){}

    lists(userId: string): UserListsCollection
    {
        return new UserListsCollection(this.uc.doc(userId).collection(LISTS))
    }

    async get(userId: string): Promise<User>
    {
        return (await this.uc.doc(userId).get()).data() as User
    }

    async create(userId: string): Promise<void>
    {
        await this.uc.doc(userId).set({'bookmarks': {}})
    }

    async setDefaultList(userId: string, list: List): Promise<void>
    {
        await this.uc.doc(userId).update({defaultList:
            {listId: list.listId, listName: list.listName}})
    }

    async setBookmark(userId: string, novelId: string, bookmark: Bookmark)
    {
        await this.uc.doc(userId).update({[`bookmarks.${novelId}`]: bookmark})
    }

    async removeBookmark(userId: string, novelId: string)
    {
        await this.uc.doc(userId).update({[`bookmarks.${novelId}`]: null})
    }

    async delete(userId: string): Promise<void>
    {
        await this.lists(userId).deleteCollection()
        await this.uc.doc(userId).delete()
    }
}
