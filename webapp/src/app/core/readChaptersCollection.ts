import { firestore } from 'firebase'

export class ReadChaptersCollection
{
    constructor(private rcc: firestore.CollectionReference){}

    async getAll(): Promise<string[]>
    {
        const response = await this.rcc.get()
        return response.docs.map(chapter => chapter.id)
    }

    async add(chapterId: string): Promise<void>
    {
        await this.rcc.doc(chapterId).set({})
    }

    async remove(chapterId: string): Promise<void>
    {
        await this.rcc.doc(chapterId).delete()
    }
}
