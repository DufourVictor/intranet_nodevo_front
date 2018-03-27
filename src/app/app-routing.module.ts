import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { EmpowermentComponent } from './empowerment/empowerment.component';
import { BusinessComponent } from './business/business.component';
import { CustomersComponent } from './customers/customers.component';
import { BusinessDetailsComponent } from './business/business-details/business-details.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user', component: UserDetailsComponent },
    { path: 'user/:id', component: UserDetailsComponent },
    { path: 'empowerment', component: EmpowermentComponent },
    { path: 'businesses', component: BusinessComponent },
    { path: 'business', component: BusinessDetailsComponent },
    { path: 'business/:id', component: BusinessDetailsComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'customers/:id/businesses', component: BusinessComponent },
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
