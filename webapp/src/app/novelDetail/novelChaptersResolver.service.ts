import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Chapter, DatabaseService } from 'wnu-shared'

@Injectable()
export class NovelChaptersResolver implements Resolve<Chapter[]>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Chapter[]>
    {
        try
        {
            const novelId = route.paramMap.get('id')

            return await this.db.chapters.getNovelChapters(novelId, 30)
        }
        catch
        {
            this.router.navigate(['/novels'])
            return null
        }
    }
}
