import { Injectable } from '@angular/core'
import * as fb from 'firebase'
import 'firebase/firestore' // necessary because of its side-effects
import { Novel, Chapter, User, List, ListNovel } from './Interfaces'

const CHAPTERS = 'chapters'
const NOVELS = 'novels'
const USERS = 'users'
const PUBLICATION_DATE = 'publicationDate'
const TITLE = 'title'
const READ_CHAPTERS = 'readChapters'
const NOVEL_ID = 'novel'
const LISTS = 'lists'


@Injectable()
export class DatabaseService
{
    private readonly fs: fb.firestore.Firestore

    constructor()
    {
        this.fs = fb.firestore()
    }

    async getUpdates(noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .limit(noOfUpdates)
            .get()
        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getUpdatesAfter(date: Date, noOfUpdates: number): Promise<Chapter[]>
    {
        const response = await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .startAfter(date)
            .limit(noOfUpdates)
            .get()

        return response.docs.map(doc => doc.data() as Chapter)
    }

    async getAllNovels(): Promise<Novel[]>
    {
        const response = await this.fs.collection(NOVELS)
            .orderBy(TITLE, 'asc')
            .get()
        return response.docs.map(novel => novel.data() as Novel)
    }

    async getNovel(novelId: string): Promise<Novel>
    {
        return (await this.fs.collection(NOVELS).doc(novelId).get()).data() as Novel
    }

    async getNovelChapters(novelId: string): Promise<Chapter[]>
    {
        return (await this.fs.collection(CHAPTERS)
            .orderBy(PUBLICATION_DATE, 'desc')
            .where(NOVEL_ID, '==', novelId)
            .get())
            .docs.map(snap =>
            {
                return snap.data() as Chapter
            })
    }

    async getUser(userId: string): Promise<User>
    {
        return (await this.fs.collection(USERS).doc(userId).get()).data() as User
    }

    async getLists(userId: string): Promise<List[]>
    {
        const response = await this.fs.collection(USERS).doc(userId).collection(LISTS).get()
        return response.docs.map(list => list.data() as List)
    }

    async addList(userId: string, list: List): Promise<List>
    {
        const listReference = this.fs.collection(USERS).doc(userId).collection(LISTS).doc()
        list.listId = listReference.id
        await listReference.set(list)

        return list
    }

    async setDefaultList(userId: string, list: List): Promise<void>
    {
        await this.fs.collection(USERS).doc(userId).update({defaultList:
            {listId: list.listId, listName: list.listName}})
    }

    async renameList(userId: string, listId: string, newName: string): Promise<void>
    {
        await this.fs.collection(USERS).doc(userId)
            .collection(LISTS).doc(listId).update({listName: newName})
    }

    async deleteList(userId: string, listId: string): Promise<void>
    {
        await this.fs.collection(USERS).doc(userId)
            .collection(LISTS).doc(listId).delete()
    }

    async setNovelsOfList(userId: string, novels: ListNovel[], listId: string)
    {
        await this.fs.collection(USERS).doc(userId)
            .collection(LISTS).doc(listId).update({novels: novels})
    }

    async getReadChapters(userId: string): Promise<string[]>
    {
        const response = await this.fs.collection(USERS)
            .doc(userId).collection(READ_CHAPTERS).get()
        return response.docs.map(chapter => chapter.id)
    }

    async addReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.fs.collection(USERS).doc(userId)
            .collection(READ_CHAPTERS).doc(chapterId).set({})
    }

    async removeReadChapter(userId: string, chapterId: string): Promise<void>
    {
        await this.fs.collection(USERS).doc(userId)
            .collection(READ_CHAPTERS).doc(chapterId).delete()
    }
}
