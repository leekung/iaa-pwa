import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationsService } from 'angular2-notifications';
import { AuthService } from 'app/shared/auth.service';
import { UserInfo } from 'app/shared/user-info';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import {firebaseConfig} from "environments/firebaseConfig";
import {Md5} from 'ts-md5/dist/md5';

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
    private firebasestorage: firebase.app.App;
    private sw: ServiceWorkerRegistration

    constructor(private authService: AuthService, private router: Router,
    private _pushNotifications: PushNotificationsService) {
        this.firebasestorage = firebase.initializeApp(firebaseConfig, "PWA-Noti") // No idea for now, just mess it like this
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        _pushNotifications.requestPermission()
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
