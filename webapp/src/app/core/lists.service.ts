import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { List, DatabaseService, ListNovel } from 'wnu-shared'
import { GoogleAnalyticsService } from './googleAnalytics.service'

@Injectable()
export class ListsService
{
    private userId: string
    public lists = [] as List[]
    public defaultList = null as {listId: string, listName: string}

    constructor(private db: DatabaseService, private user: UserService,
        private ga: GoogleAnalyticsService)
    {
        this.user.doOnLoginChange(async () =>
        {
            this.userId = this.user.isLoggedIn ? this.user.fbUser.uid : null
            this.defaultList = this.user.isLoggedIn ? this.user.wnuUser.defaultList : null
            this.lists = this.user.isLoggedIn ? await this.db.users.lists(this.userId).getAll() : []
        })
    }

    public async addNewList(listName: string): Promise<void>
    {
        this.checkListNameIsValid(listName)

        const newList = await this.db.users.lists(this.userId).add({listId: null, listName: listName, novels: []})
        this.lists.push(newList)

        this.ga.emitEvent('add list', 'Lists')
    }

    public async setDefaultList(list: List): Promise<void>
    {
        await this.db.users.setDefaultList(this.userId, list)
        this.defaultList = list

        this.ga.emitEvent('set default', 'Lists')
    }

    public async renameList(list: List, newName: string): Promise<void>
    {
        this.checkListNameIsValid(newName)
        await this.db.users.lists(this.userId).rename(list.listId, newName)
        list.listName = newName

        if (this.defaultList.listId === list.listId)
        {
            await this.setDefaultList({ listId: list.listId, listName: newName })
        }

        this.ga.emitEvent('rename list', 'Lists')
    }

    public async deleteList(list: List): Promise<void>
    {
        if (list.listId === this.defaultList.listId)
        {
            throw new Error('Default list cannot be deleted')
        }
        await this.db.users.lists(this.userId).delete(list.listId)
        this.lists = this.lists.filter(l => l.listId !== list.listId)

        await this.addNovelsToList(list.novels, this.getDefaultList())

        this.ga.emitEvent('delete list', 'Lists')
    }

    public async addNovelsToList(novels: ListNovel[], list: List): Promise<void>
    {
        list.novels = list.novels.concat(novels)
        await this.db.users.lists(this.userId).setNovels(list.novels, list.listId)

        this.ga.emitEvent('add novel', 'Lists')
    }

    public async deleteNovelFromList(novel: ListNovel, list: List): Promise<void>
    {
        list.novels = list.novels.filter(n => n.novelId !== novel.novelId)
        await this.db.users.lists(this.userId).setNovels(list.novels, list.listId)

        this.ga.emitEvent('delete novel', 'Lists')
    }

    public async moveNovel(novel: ListNovel, from: List, to: List): Promise<void>
    {
        await this.addNovelsToList([novel], to)
        await this.deleteNovelFromList(novel, from)

        this.ga.emitEvent('move novel', 'Lists')
    }

    private checkListNameIsValid(listName: string)
    {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

        if (!listName || specialCharacters.test(listName))
        {
            throw new Error('A list must have a name that only consists of letters and numbers')
        }
    }

    public getDefaultList(): List
    {
        return this.lists.find(l => l.listId === this.defaultList.listId)
    }

    public novelWithList(novelId: string): List
    {
        return this.lists.find(list => list.novels.some(n => n.novelId === novelId))
    }

    public novelIsInList(novelId: string): boolean
    {
        return this.novelWithList(novelId) !== undefined
    }
}
