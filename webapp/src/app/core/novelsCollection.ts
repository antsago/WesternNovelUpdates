import { firestore } from 'firebase'
import { Novel } from './Interfaces'

const TITLE = 'title'

export class NovelsCollection
{
    constructor(private nc: firestore.CollectionReference){}

    async addNovel(novel: Novel): Promise<void>
    {
        const novelReference = this.nc.doc()
        novel.id = novelReference.id
        await novelReference.set(novel)
    }

    async getAllNovels(): Promise<Novel[]>
    {
        const response = await this.nc
            .orderBy(TITLE, 'asc')
            .get()
        return response.docs.map(novel => novel.data() as Novel)
    }

    async getNovel(novelId: string): Promise<Novel>
    {
        return (await this.nc.doc(novelId).get()).data() as Novel
    }
}
