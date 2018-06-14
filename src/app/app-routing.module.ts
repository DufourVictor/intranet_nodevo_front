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
import { DirectoryComponent } from './directory/directory.component';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { ReferentialComponent } from './referential/referential.component';

const routes: Routes = [
    { path: '', component: LoginComponent, outlet: 'login' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'crm',
        children: [
            { path: '', redirectTo: 'customers', pathMatch: 'full' },
            { path: 'customers', component: CustomersComponent, data: { title: 'Liste des clients', display: true } },
            { path: 'customer', component: CustomerDetailsComponent, data: {
                display: false, name: 'CRM', access: 'WRITE'
            } },
            { path: 'customer/:id', component: CustomerDetailsComponent, data: {
                display: false, name: 'CRM', access: 'WRITE'
            } },
            { path: 'directory', component: DirectoryComponent, data: { title: 'Annuaire', display: true } },
        ],
        canActivate: [RoleGuard],
        data: { name: 'CRM', access: 'READ' }
    },
    {
        path: 'gescom',
        children: [
            { path: '', redirectTo: 'businesses', pathMatch: 'full' },
            { path: 'businesses', component: BusinessComponent, data: { title: 'Affaires', display: true } },
            { path: 'business', component: BusinessDetailsComponent, data: {
                display: false, name: 'Gestion commerciale', access: 'WRITE'
            } },
            { path: 'business/:id', component: BusinessDetailsComponent, data: {
                display: false, name: 'Gestion commerciale', access: 'WRITE'
            } },
            { path: 'quotations', component: QuotationComponent, data: { title: 'Devis', display: true } },
            { path: 'quotation', component: QuotationDetailsComponent, data: {
                display: false, name: 'Gestion commerciale', access: 'WRITE'
            } },
            { path: 'quotation/:id', component: QuotationDetailsComponent, data: {
                display: false, name: 'Gestion commerciale', access: 'WRITE'
            } },
        ],
        canActivate: [RoleGuard],
        data: { name: 'Gestion commerciale', access: 'READ' }
    },
    { path: 'empowerment', component: EmpowermentComponent, canActivate: [RoleGuard] },
    {
        path: 'settings',
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent, data: { title: 'Utilisateurs', display: true } },
            { path: 'user', component: UserDetailsComponent, data: {
                display: false, name: 'Paramétrage', access: 'WRITE'
            } },
            { path: 'user/:id', component: UserDetailsComponent, data: {
                display: false, name: 'Paramétrage', access: 'WRITE'
            } },
            { path: 'referential', component: ReferentialComponent, data: { title: 'Référentielle', display: true } },
        ],
        canActivate: [RoleGuard],
        data: { name: 'Paramétrage', access: 'READ' }
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
