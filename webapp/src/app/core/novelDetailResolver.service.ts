import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel } from '../utilities/Interfaces'
import { DatabaseService } from '../utilities/database.service'

@Injectable()
export class NovelDetailResolver implements Resolve<Novel>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel>
    {
        try
        {
            return await this.db.getNovel(route.paramMap.get('id'))
        }
        catch
        {
            this.router.navigate(['/novels'])
            return null
        }
    }
}
