import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { EmpowermentComponent } from './empowerment/empowerment.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user', component: UserDetailsComponent },
    { path: 'user/:id', component: UserDetailsComponent },
    { path: 'empowerment', component: EmpowermentComponent }
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
