import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        OAuthService,
        HttpClient,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
