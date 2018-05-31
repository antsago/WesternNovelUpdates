import { Component, Input } from '@angular/core'
import { List, Novel, ListNovel } from 'wnu-shared'
import { ListsService, UserService } from '@app/core'

@Component(
{
    selector: 'wnu-NovelDetailListMenu',
    templateUrl: './novelDetailListMenu.component.html'
})
export class NovelDetailListMenuComponent
{
    @Input() novel: Novel

    constructor(public lists: ListsService, public login: UserService) {}

    async saveToList(list: List)
    {
        if (this.login.isLoggedIn)
        {
            await this.lists.addNovelsToList([this.getListNovel()], list)
        }
        else
        {
            await this.login.login()
        }
    }

    async moveToList(list: List)
    {
        await this.lists.moveNovel(this.getListNovel(), this.lists.novelWithList(this.novel.id), list)
    }

    async deleteFromList()
    {
        await this.lists.deleteNovelFromList(this.getListNovel(), this.lists.novelWithList(this.novel.id))
    }

    private getListNovel(): ListNovel
    {
        return { novelId: this.novel.id, novelTitle: this.novel.title }
    }
}
