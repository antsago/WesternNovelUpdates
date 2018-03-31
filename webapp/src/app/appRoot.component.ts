import { Component } from '@angular/core'
import { LoginService, AlertService } from './shared/shared.module'

@Component(
{
    selector: 'app-root',
    templateUrl: './appRoot.component.html'
})
export class AppRootComponent
{
    private isNavbarCollapsed = true

    constructor(private login: LoginService, private alertService: AlertService) {}

    loginOrRegister()
    {
        this.login.login()
    }

    logout()
    {
        this.login.logout()
    }
}

