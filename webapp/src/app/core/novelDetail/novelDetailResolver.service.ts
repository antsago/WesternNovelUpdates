import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel, DatabaseService } from '../../shared/shared.module'

@Injectable()
export class NovelDetailResolver implements Resolve<Novel>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel>
    {
        try
        {
            const novelId = route.paramMap.get('id')
            const novelPromise = this.db.getNovel(novelId)
            const chapters = await this.db.getNovelChapters(novelId)

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
