import { firestore } from 'firebase'
import { NovelRequest } from './Interfaces'

export class NovelRequestsCollection
{
    constructor(private rc: firestore.CollectionReference){}

    async addNovelRequest(request: NovelRequest): Promise<void>
    {
        const requestReference = this.rc.doc()
        request.id = requestReference.id
        await requestReference.set(request)
    }

    async getNovelRequests(): Promise<NovelRequest[]>
    {
        const response = await this.rc.get()
        return response.docs.map(nr => nr.data() as NovelRequest)
    }

    async deleteNovelRequest(request: NovelRequest): Promise<void>
    {
        await this.rc.doc(request.id).delete()
    }
}
