import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Novel, DatabaseService } from 'wnu-shared'
import { MessageService } from '@app/core'

@Injectable()
export class NovelResolver implements Resolve<Novel>
{
    constructor(private db: DatabaseService, private router: Router, private ms: MessageService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Novel>
    {
        try
        {
            const novelId = route.paramMap.get('id')
            const novel = await this.db.novels.get(novelId)
            if (!novel)
            {
                this.router.navigate([`/novel-${novelId}-not-found`])
                return null
            }
            return novel
        }
        catch
        {
            const message = 'Ups, it seems something went wrong.\nTry again later and if it persists let use know and we\'ll fix it.'
            this.ms.displayAlert(message, this.ms.ERROR)

            return null
        }
    }
}
