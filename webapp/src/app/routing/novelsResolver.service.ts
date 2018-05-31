import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel, DatabaseService } from 'wnu-shared'

@Injectable()
export class NovelsResolver implements Resolve<Novel[]>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel[]>
    {
        try
        {
            return await this.db.novels.getAll()
        }
        catch
        {
            return null
        }
    }
}
