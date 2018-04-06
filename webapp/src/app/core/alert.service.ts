import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Injectable()
export class AlertService
{
    public readonly INFO = 'alert-info'
    public readonly ERROR = 'alert-warning'

    public type = ''
    public showAlert = false
    public message = ''

    constructor(private router: Router)
    {
        router.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            {
                this.showAlert = false
            }
        })
    }

    public displayAlert(message: string, type: string)
    {
        this.type = type
        this.message = message
        this.showAlert = true

        setTimeout(() => this.showAlert = false, 5000)
    }
}
