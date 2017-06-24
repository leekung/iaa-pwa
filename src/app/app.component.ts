import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationsService } from 'angular2-notifications/dist';
import { AuthService } from 'app/shared/auth.service';
import { UserInfo } from 'app/shared/user-info';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public alertType = null;
    public alertMessage = "";
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    public isSubscribe = false;
    public menuToggle:boolean = false

    constructor(private authService: AuthService, private router: Router,
    private _pushNotifications: PushNotificationsService) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        this.isSubscribe = _pushNotifications.permission == "granted"
    }

    doSubscribe() {
        if (!this.isSubscribe) {
            this._pushNotifications.requestPermission()
        }
    }

    doPush() {
        this._pushNotifications.create('Test', {
            body: 'something',
            icon: "/assets/images/192.png",
            vibrate: [1000]
        }).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
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
