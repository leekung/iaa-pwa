import { Md5 } from 'ts-md5/dist/md5';
import { UserInfo } from 'app/shared/user-info';
import { AppModule } from './../app.module';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {firebaseConfig} from "environments/firebaseConfig";
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
    selector: 'app-display-user',
    templateUrl: './display-user.component.html',
    styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
    @Output() onLoggedOut = new EventEmitter();
    @Input() folder: string;
    private uid: string;
    private firebasestorage: firebase.app.App;
    public imageUrl: string = ""
    public userInfo: Observable<UserInfo>;
    loading: boolean = false

    constructor(private authService: AuthService) {
        this.firebasestorage = firebase.initializeApp(firebaseConfig, "PWA-Yeh2")
        this.userInfo = authService.userInfo;
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    logout() {
        this.authService.logout().subscribe(() => this.onLoggedOut.emit("success"));
    }

    upload() {
        if (this.authService.isLoggedIn()) {
            let storageRef = this.firebasestorage.storage().ref();
            this.loading = true;
            for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
                this.authService.userInfo.subscribe(u => {
                    let id = u.uid
                    let fileName = Md5.hashStr(u.uid)
                    let extension = selectedFile.name.split(".").pop()
                    storageRef.child("users/" + fileName + "." + extension).put(selectedFile).then(
                    snapshot => {
                        this.loading = false
                        this.imageUrl = snapshot.downloadURL;
                        this.firebasestorage.database().ref("users/" + id).set({
                            avatar : this.imageUrl
                            
                        });
                    });
        
                })
                
            }
        }
    }
}
