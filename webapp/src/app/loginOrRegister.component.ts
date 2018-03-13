import { Component } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import * as fb from 'firebase'

@Component(
{
    templateUrl: './loginOrRegister.component.html'
})
export class LoginOrRegisterComponent
{
    public loginForm =
    {
        email: '',
        password: '',
        errorMessage: '',
        thereIsError: false
    }

    constructor(public activeModal: NgbActiveModal) {}

    async login()
    {
        try
        {
            await fb.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
            this.activeModal.close('loged in')
        }
        catch (err)
        {
            this.showErrorMessage(err.message)
        }
    }

    showErrorMessage(message)
    {
        this.loginForm.thereIsError = true
        this.loginForm.errorMessage = message
    }
}
