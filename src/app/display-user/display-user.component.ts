import { Md5 } from 'ts-md5/dist/md5';
import { UserInfo } from 'app/shared/user-info';
import { AppModule } from './../app.module';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { WebCamComponent } from 'ng2-webcam';

@Component({
    selector: 'app-display-user',
    templateUrl: './display-user.component.html',
    styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
    @Output() onLoggedOut = new EventEmitter();
    @Input() folder: string;
    private uid: string;
    private firebasestorage: firebase.storage.Storage;
    public imageUrl: string = null
    @Input() userInfo: UserInfo;
    loading: boolean = false
    onSuccess: any
    onError: any
    options: any
    video: any
    canvas: any


    constructor(private authService: AuthService, firebaseApp: FirebaseApp) {
        this.firebasestorage = firebaseApp.storage()
        this.currentUser()
        .subscribe((userInfo) => {
            this.userInfo = userInfo
            this.imageUrl = userInfo.photoURL
        })
        this.onSuccess = (stream: MediaStream) => {
            console.log(stream)

        }
        this.onError = (err) => {}
        this.options = {
            audio: false,
            video: true,
            width: 350,
            height: 250
        }
        this.video = <any>document.getElementsByTagName('video')[0]
        this.canvas = <any>document.getElementsByTagName('canvas')[0]
        if (this.video) {
          this.canvas.width = 350;
          this.canvas.height = 250;
          this.canvas.getContext('2d').drawImage(this.video, 0, 0);
        }        
    }

    logout() {
        this.authService.logout().subscribe(() => this.onLoggedOut.emit("success"));
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser()
    }

    capture() {
        this.video = <any>document.getElementsByTagName('video')[0]
        this.canvas = <any>document.getElementsByTagName('canvas')[0]
        if (this.video) {
          this.canvas.width = 350;
          this.canvas.height = 250;
          this.canvas.getContext('2d').drawImage(this.video, 0, 0);
            let url = this.canvas.toBlob(blob => {
                let storageRef = this.firebasestorage.ref();
                let fileName = Md5.hashStr(this.userInfo.uid)
                storageRef.child("users/" + fileName + ".png").put(blob)
                    .then(snapshot => {
                        this.authService.updateDisplayName(this.userInfo.displayName, snapshot.downloadURL)
                        .subscribe(() =>
                        {
                            document.location.href = '/me?t='+ (new Date().getTime())
                        })
                    })

            })
        
        }  
    }

    upload() {
        if (this.authService.isLoggedIn()) {
            let storageRef = this.firebasestorage.ref();
            for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
                if (selectedFile) {
                    this.loading = true;
                    let id = this.userInfo.uid
                    let fileName = Md5.hashStr(this.userInfo.uid)
                    let extension = selectedFile.name.split(".").pop().toLowerCase()

                    storageRef.child("users/" + fileName + "." + extension).put(selectedFile)
                    .then(snapshot => {
                        this.authService.updateDisplayName(this.userInfo.displayName, snapshot.downloadURL)
                        .subscribe(() =>
                        {
                            document.location.href = '/me?t='+ (new Date().getTime())
                        })
                        
                    })

                }
                
            }
        }
    }
}
