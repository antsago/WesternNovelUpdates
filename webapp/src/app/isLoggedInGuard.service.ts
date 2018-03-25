import { Injectable } from '@angular/core'
import { CanActivate, Router} from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService } from './utilities/authentication.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component'

@Injectable()
export class IsLoggedInGuard implements CanActivate
{
    constructor(public auth: AuthenticationService, private modalService: NgbModal,  private router: Router) {}

    canActivate(): boolean
    {
        if (this.auth.isLoggedIn)
        {
            return true
        }
        this.modalService.open(LoginOrRegisterComponent).result.then(
            loggedIn =>
            {
                this.router.navigateByUrl('/readingLists')
            },
            dismissed =>
            {
                if (!this.router.navigated)
                {
                    this.router.navigateByUrl('')
                }
                return false
            })
    }
}
