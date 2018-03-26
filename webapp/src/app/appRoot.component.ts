import { Component } from '@angular/core'
import { LoginService } from './utilities/login.service'
import { AuthenticationService } from './utilities/authentication.service';

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    public isNavbarCollapsed = true

    constructor(private login: LoginService, public auth: AuthenticationService) {}

    loginOrRegister()
    {
        this.login.login()
    }

    logout()
    {
        this.auth.logout()
    }
}

