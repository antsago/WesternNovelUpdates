import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel, DatabaseService } from 'wnu-shared'

@Injectable()
export class NovelResolver implements Resolve<Novel>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel>
    {
        try
        {
            const novelId = route.paramMap.get('id')

            return await this.db.novels.get(novelId)
        }
        catch
        {
            this.router.navigate(['/novels'])
            return null
        }
    }
}
