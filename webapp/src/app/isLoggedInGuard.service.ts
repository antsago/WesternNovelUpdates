import { Injectable } from '@angular/core'
import { CanActivate, Router} from '@angular/router'
import { LoginService } from './utilities/login.service'

@Injectable()
export class IsLoggedInGuard implements CanActivate
{
    constructor(private login: LoginService,  private router: Router) {}

    async canActivate(): Promise<boolean>
    {
        if (await this.login.userWantsToLogin())
        {
           return true
        }
        this.router.navigateByUrl('')
        return false
    }
}
