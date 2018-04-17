import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel, DatabaseService } from '@app/core'

@Injectable()
export class NovelDetailResolver implements Resolve<Novel>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel>
    {
        try
        {
            const novelId = route.paramMap.get('id')
            const novelPromise = this.db.novels.getNovel(novelId)
            const chapters = await this.db.chapters.getNovelChapters(novelId)

            const novel = await novelPromise
            novel.chapters = chapters
            return novel
        }
        catch
        {
            this.router.navigate(['/novels'])
            return null
        }
    }
}
