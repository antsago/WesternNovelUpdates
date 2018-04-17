import { firestore } from 'firebase'

export class ReadChaptersCollection
{
    constructor(private rcc: firestore.CollectionReference){}

    async getReadChapters(userId: string): Promise<string[]>
    {
        const response = await this.rcc.get()
        return response.docs.map(chapter => chapter.id)
    }

    async addReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.rcc.doc(chapterId).set({})
    }

    async removeReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.rcc.doc(chapterId).delete()
    }
}
