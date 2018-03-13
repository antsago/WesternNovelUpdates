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
        alertClosed: true
    }
    public registerForm =
    {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
        alertClosed: true
    }

    constructor(public activeModal: NgbActiveModal) {}

    async login()
    {
        try
        {
            await fb.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
            this.activeModal.close('Loged in')
        }
        catch (err)
        {
            this.showErrorMessage(err.message, this.loginForm)
        }
    }

    async register()
    {
        try
        {
            await fb.auth().createUserWithEmailAndPassword(this.registerForm.email, this.registerForm.password)
            await fb.auth().currentUser.updateProfile(
            {
                displayName: this.registerForm.username,
                photoURL: null
            })
            this.activeModal.close('Registered')
        }
        catch (err)
        {
            this.showErrorMessage(err.message, this.registerForm)
        }
    }

    private showErrorMessage(message, form)
    {
        form.alertClosed = false
        form.errorMessage = message
    }
}
