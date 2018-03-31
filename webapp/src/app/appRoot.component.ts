import { Component } from '@angular/core'
import { LoginService } from './shared/shared.module'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    private isNavbarCollapsed = true

    constructor(private login: LoginService) {}

    loginOrRegister()
    {
        this.login.login()
    }

    logout()
    {
        this.login.logout()
    }
}

