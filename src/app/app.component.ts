import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';
import { UserInfo } from 'app/shared/user-info';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public alertType = null;
    public alertMessage = "";
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    public menuToggle:boolean = false

    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
    }

    pushMe() {
        console.log("pushMe")
        window["OneSignal"].getNotificationPermission()
        .then((e)=>{
            if (e == "granted") {
                window["OneSignal"].sendSelfNotification("ok")

            }
        })

    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    onResetPasswordSuccess() {
        this.alertType = "success";
        this.alertMessage = "Reset Password Sent!";
    }

    onLoginSuccess() {
        this.alertType = "success";
        this.alertMessage = "Login Success!";
    }

    onRegisterSuccess() {
        this.alertType = "success";
        this.alertMessage = "User registered!";
    }

    onError(err) {
        this.alertType = "danger";
        this.alertMessage = err;
    }

    onLoggedOut() {
        // Just reset any displayed messsage.
        this.alertType = null;
        this.alertMessage = "";
    }

    alertClosed() {
        this.alertType = null;
        this.alertMessage = "";
    }
}
