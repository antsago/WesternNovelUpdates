import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Injectable()
export class MessageService
{
    public readonly INFO = 'alert-info'
    public readonly ERROR = 'alert-warning'

    type = ''
    showAlert = false
    message = ''

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

    public displayAlert(message: string, type: 'alert-info'|'alert-warning')
    {
        this.type = type
        this.message = message
        this.showAlert = true

        setTimeout(() => this.showAlert = false, 5000)
    }
}
