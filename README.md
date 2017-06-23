# PWA-Yeh

## Purpose

* Angular 4 (based on angular-cli)
* Firebase via AngualarFire2
* Progressive Web App
* Service Worker via sw-precache, sw-toolbox
* Push Notification via Firebase Cloud Messaging
* GetUserMedia API via ng2-webcam

## Init

```shell
$ npm install -g yo
$ npm install -g generator-ngx-firebase-bootstrap
$ mkdir IAA-PWA
$ cd IAA-PWA
$ yo ngx-firebase-bootstrap
```

## Install dependencies

@angular/animations, angular2-notifications, ng2-webcam, sw-precache,  sw-toolbox, bulma, etc...

## Build && Deploy

```shell
$ firebase logout
$ firebase login
$ firebase init
$ ng build --prod --aot
$ sw-precache --verbose --config=sw-precache-config.js
$ firebase deploy
```
