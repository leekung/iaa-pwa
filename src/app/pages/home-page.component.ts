import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    public title: string
    userInfo: Observable<UserInfo>;
    isLoggedIn = new BehaviorSubject(false);

    countDown: boolean = false
    countDownTo: string
    teams: string

    matches: string[] = [
        "June 25, 2017 22:00",
        "June 29, 2017 01:00",
        "July 02, 2017 19:00",
        "July 03, 2017 01:00",
    ]
    matchesTeam: string[] = [
        "<h2 class='subtitle'>เยอรมนี VS แคเมอรูน <span class='inline'>(25 มิถุนายน 2560 22:00)</span><br><br>ชิลี VS ออสเตรเลีย <span class='inline'>(25 มิถุนายน 2560 22:00)</span></h2>",
        "<h2 class='subtitle'>โปรตุเกส VS ?? <span class='inline'>(25 มิถุนายน 2560 01:00)</span></h2>",
        "<h2 class='subtitle'>?? VS เม็กซิโก <span class='inline'>(2 กรกฎาคม 2560 19:00)</span></h2>",
        "<h2 class='subtitle'>?? VS ?? <span class='inline'>(3 กรกฎาคม 2560 01:00)</span></h2>",
    ]

    constructor(private authService: AuthService, private router: Router, private _cookieService:CookieService) {
        this.userInfo = authService.userInfo;
        this.userInfo
            .map(userInfo => !userInfo.isAnonymous)
            .subscribe(this.isLoggedIn);

        if(this._cookieService.get("countdown") !== "0") {
            let now = new Date()
            for(let i=0; i<this.matches.length; i++) {
                let match = new Date(this.matches[i])
                if (now < match) {
                    this.countDown = true;
                    this.countDownTo = this.matches[i]
                    this.teams = this.matchesTeam[i]
                    break
                }
            }
        }
    }

    closeCountdown() {
        let now = new Date()
        let option = {
            expires: now.setHours(now.getHours() + 3).toString(),
        }
        this.countDown = false
        this._cookieService.put("countdown", "0", option)
    }

    navigateToLogin(e) {
        this.router.navigate(['/login']);
        e.preventDefault();
    }

    navigateToRegister(e) {
        this.router.navigate(['/register']);
        e.preventDefault();
    }
}
