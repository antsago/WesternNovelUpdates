import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Chapter, DatabaseService } from '@app/firebaseLayer'

const NumberOfUpdates = 10

@Injectable()
export class ChaptersResolver implements Resolve<Chapter[]>
{
    constructor(private db: DatabaseService, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Chapter[]>
    {
        try
        {
           return await this.db.chapters.getLatests(NumberOfUpdates)
        }
        catch
        {
            return null
        }
    }
}
