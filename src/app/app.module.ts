import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthService} from "app/shared/auth.service";
import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { TeamComponent } from './team/team.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './schedule/schedule.component';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'me', component: DisplayUserComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomePageComponent },
    { path: 'team', component: TeamComponent },
    { path: 'rank', component: RankComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        TeamComponent,
        ErrorComponent,
        ScheduleComponent,
        RankComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig, "PWA-Yeh"),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes)
    ],
    providers: [AuthService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
