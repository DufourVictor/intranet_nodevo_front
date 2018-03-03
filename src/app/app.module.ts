import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './authentification.service';
import { TokenInterceptor } from './token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import {RetrieveUsersService} from './retrieveUsers.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        UsersComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        HttpClient,
        AuthentificationService,
        RetrieveUsersService,
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
