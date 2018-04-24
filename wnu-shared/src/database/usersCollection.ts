import { User, List } from '../Interfaces'
import { UserListsCollection } from './userListsCollection'
import { ReadChaptersCollection } from './readChaptersCollection'
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

    readChapters(userId: string): ReadChaptersCollection
    {
        return new ReadChaptersCollection(this.uc.doc(userId).collection(READ_CHAPTERS))
    }

    async get(userId: string): Promise<User>
    {
        return (await this.uc.doc(userId).get()).data() as User
    }

    async create(userId: string): Promise<void>
    {
        await this.uc.doc(userId).set({})
    }

    async setDefaultList(userId: string, list: List): Promise<void>
    {
        await this.uc.doc(userId).update({defaultList:
            {listId: list.listId, listName: list.listName}})
    }
}
