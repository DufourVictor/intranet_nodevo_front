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
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationDetailsComponent } from './quotation/quotation-details/quotation-details.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, data: { state: 'dashboard' } },
    {
        path: 'crm',
        children: [
            { path: '', redirectTo: 'customers', pathMatch: 'full' },
            { path: 'customers', component: CustomersComponent, data: { title: 'Liste des clients', display: true } },
            { path: 'customer', component: CustomerDetailsComponent, data: { display: false, displayTabs: false } },
            { path: 'customer/:id', component: CustomerDetailsComponent, data: { display: false, displayTabs: false } },
            { path: 'customers/:id/businesses', component: BusinessComponent, data: { display: false, displayTabs: false } },
        ]
    },
    {
        path: 'gescom',
        children: [
            { path: '', redirectTo: 'businesses', pathMatch: 'full' },
            { path: 'businesses', component: BusinessComponent, data: { title: 'Affaires', display: true } },
            { path: 'business', component: BusinessDetailsComponent, data: { display: false, displayTabs: false } },
            { path: 'business/:id', component: BusinessDetailsComponent, data: { display: false, displayTabs: false } },
            { path: 'quotations', component: QuotationComponent, data: { title: 'Devis', display: true } },
            { path: 'quotation', component: QuotationDetailsComponent, data: { display: false, displayTabs: false }  },
            { path: 'quotation/:id', component: QuotationDetailsComponent, data: { display: false, displayTabs: false }  },
        ]
    },
    { path: 'empowerment', component: EmpowermentComponent },
    {
        path: 'settings',
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent, data: { title: 'Utilisateurs', display: true, state: 'settings/users' } },
            { path: 'user', component: UserDetailsComponent, data: { display: false, displayTabs: false, state: 'settings/user' } },
            { path: 'user/:id', component: UserDetailsComponent, data: { display: false, displayTabs: false, state: 'settings/user' } },
        ]
    },
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
