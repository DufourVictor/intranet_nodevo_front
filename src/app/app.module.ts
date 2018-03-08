import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './authentification.service';
import { TokenInterceptor } from './token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { NoneRecordingTimesComponent } from './none-recording-times/none-recording-times.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import {GroupsService, NoTimeRecordingsService, ProfilesService, TrainingBonusesService, UsersService } from '../backend/services';
import { RestangularModule } from 'ngx-restangular';
import { RestangularConfigFactory } from '../backend/services/RestangularConfigFactory';
import { FormService } from '../backend/forms';
import { TrainingsBonusComponent } from './trainings-bonus/trainings-bonus.component';
import { TrainingBonusFormComponent } from './training-bonus-form/training-bonus-form.component';
import { NoneRecordingTimeFormComponent } from './none-recording-time-form/none-recording-time-form.component';

registerLocaleData(localeFr, 'fr');
export function createRestangularConfigFactory(RestangularProvider) {
    return RestangularConfigFactory(RestangularProvider, { baseUrl: 'https://localhost:8443' });
}
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        UsersComponent,
        MenuComponent,
        NoneRecordingTimesComponent,
        UserDetailsComponent,
        UserFormComponent,
        TrainingsBonusComponent,
        TrainingBonusFormComponent,
        NoneRecordingTimeFormComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RestangularModule.forRoot([], createRestangularConfigFactory)
    ],
    providers: [
        HttpClient,
        AuthentificationService,
        NoTimeRecordingsService,
        ProfilesService,
        UsersService,
        GroupsService,
        TrainingBonusesService,
        FormService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
