import { Injectable } from '@angular/core'
import { CanActivate, Router} from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from './utilities/user.service'
import { LoginOrRegisterComponent } from './loginOrRegister.component'

@Injectable()
export class IsLoggedInGuard implements CanActivate
{
    constructor(public us: UserService, private modalService: NgbModal,  private router: Router) {}

    canActivate(): boolean
    {
        if (this.us.isLoggedIn)
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
