import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {NoTimeRecordingFormComponent} from './no-time-recording-form/no-time-recording-form.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserDetailsComponent }
    { path: 'no-time-recordingForm', component: NoTimeRecordingFormComponent }

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(
            routes
            // {enableTracing: true}
        ),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [RouterModule]
})

export class AppRoutingModule {
}
