import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlertService, ListsService, ReadChaptersService, Chapter, Novel,
    UserService, DatabaseService } from '@app/core'

@Component(
{
    templateUrl: './latestChapters.component.html'
})
export class LatestChaptersComponent implements OnInit
{
    private readonly NumberOfUpdates = 10
    public chapters: Chapter[]
    private novels: {[id: string]: Novel}

    constructor(private db: DatabaseService, private route: ActivatedRoute,
        private login: UserService, public read: ReadChaptersService,
        public lists: ListsService, private as: AlertService) {}

    async ngOnInit()
    {
        this.chapters = this.route.snapshot.data['chapters']
        this.novels = this.route.snapshot.data['novels'].reduce((map, novel) =>
        {
            map[novel.id] = novel
            return map
        }, {})
    }

    async getMoreUpdates()
    {
        const lastDate = this.chapters[this.chapters.length - 1]['publicationDate']
        const newUpdates = await this.db.chapters.getUpdatesAfter(lastDate, this.NumberOfUpdates)
        this.chapters = [...this.chapters, ...newUpdates]
    }

    async markAsRead(chapter: Chapter, novelTitle: string)
    {
        if (this.login.isLoggedIn)
        {
            if (!this.lists.novelIsInList(chapter.novel))
            {
                const novel = { novelId: chapter.novel, novelTitle: novelTitle }
                await this.lists.addNovelsToList([novel], this.lists.getDefaultList())
                const message = `Novel ${novelTitle} added to "${this.lists.defaultList.listName}" list`
                this.as.displayAlert(message, this.as.INFO)
            }
            await this.read.markChaptersAsRead([chapter.guid])
        }
        else
        {
            await this.login.login()
        }
    }

    async markAsUnread(chapter: Chapter)
    {
        await this.read.markChaptersAsUnread([chapter.guid])
    }
}
