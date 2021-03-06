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
import { UsersComponent } from './user/users.component';
import { MenuComponent } from './menu/menu.component';
import { NoneRecordingTimesComponent } from './none-recording-times/none-recording-times.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import {
    AclsService,
    BusinessesService,
    CGVsService,
    ContactsService,
    CostPerYearsService,
    CustomersService,
    GroupsService,
    LinesService,
    SimpleLinesService,
    NoTimeRecordingsService,
    PaymentConditionsService,
    ProfilesService,
    ProvisionsService,
    QuotationsService,
    StatusesService,
    TrainingBonusesService,
    TypesService,
    UsersService
} from '../backend/services';
import { RestangularModule } from 'ngx-restangular';
import { RestangularConfigFactory } from '../backend/services/RestangularConfigFactory';
import { FormService } from '../backend/forms';
import { EmpowermentComponent } from './empowerment/empowerment.component';
import { EmpowermentsService } from './empowerments.service';
import { TrainingsBonusComponent } from './trainings-bonus/trainings-bonus.component';
import { TrainingBonusFormComponent } from './trainings-bonus/training-bonus-form/training-bonus-form.component';
import { NoneRecordingTimeFormComponent } from './none-recording-times/none-recording-time-form/none-recording-time-form.component';
import { SpectreModalComponent } from './spectre-modal/spectre-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessComponent } from './business/business.component';
import { BusinessDetailsComponent } from './business/business-details/business-details.component';
import { BusinessFormComponent } from './business/business-form/business-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { CostPerYearComponent } from './cost-per-year/cost-per-year.component';
import { CustomersComponent } from './customers/customers.component';
import { CostPerYearFormComponent } from './cost-per-year/cost-per-year-form/cost-per-year-form.component';
import { SidebarModule } from 'ng-sidebar';
import { AvatarModule } from 'ngx-avatar';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { ListUserBusinessComponent } from './business/list-user-business/list-user-business.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { QuotationComponent } from './quotation/quotation.component';
import { TabsComponent } from './tabs/tabs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuotationDetailsComponent } from './quotation/quotation-details/quotation-details.component';
import { QuotationFormComponent } from './quotation/quotation-form/quotation-form.component';
import { TableFiltersComponent } from './table-filters/table-filters.component';
import { DirectoryComponent } from './directory/directory.component';
import { QuotationFormLineComponent } from './quotation/quotation-form/quotation-form-line/quotation-form-line.component';
import { SimpleLineFormComponent } from './quotation/quotation-form/simple-line-form/simple-line-form.component';
import { ComplexLineFormComponent } from './quotation/quotation-form/complex-line-form/complex-line-form.component';
import { RoleGuardService } from './role-guard.service';
import { ReferentialComponent } from './referential/referential.component';
import { ProfileComponent } from './referential/profile/profile.component';
import { PaymentConditionComponent } from './referential/payment-conditions/payment-condition.component';
import { GroupComponent } from './referential/group/group.component';
import { TypeComponent } from './referential/type/type.component';
import { ProfileFormComponent } from './referential/profile/profile-form/profile-form.component';
import { PaymentConditionsFormComponent } from './referential/payment-conditions/payment-conditions-form/payment-conditions-form.component';
import { GroupFormComponent } from './referential/group/group-form/group-form.component';
import { TypeFormComponent } from './referential/type/type-form/type-form.component';

registerLocaleData(localeFr, 'fr');

export function createRestangularConfigFactory(RestangularProvider) {
    return RestangularConfigFactory(RestangularProvider, {baseUrl: 'https://localhost:8443'});
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
        EmpowermentComponent,
        TrainingsBonusComponent,
        TrainingBonusFormComponent,
        NoneRecordingTimeFormComponent,
        SpectreModalComponent,
        BusinessComponent,
        BusinessDetailsComponent,
        BusinessFormComponent,
        CostPerYearComponent,
        CostPerYearFormComponent,
        CustomersComponent,
        CustomerDetailsComponent,
        CustomerFormComponent,
        ContactComponent,
        ContactFormComponent,
        ListUserBusinessComponent,
        QuotationComponent,
        TabsComponent,
        QuotationDetailsComponent,
        QuotationFormComponent,
        TableFiltersComponent,
        DirectoryComponent,
        QuotationFormLineComponent,
        ReferentialComponent,
        ProfileComponent,
        PaymentConditionComponent,
        GroupComponent,
        TypeComponent,
        ProfileFormComponent,
        PaymentConditionsFormComponent,
        GroupFormComponent,
        TypeFormComponent,
        SimpleLineFormComponent,
        ComplexLineFormComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        NgHttpLoaderModule,
        AvatarModule,
        NgSelectModule,
        NgxErrorsModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            timeOut: 1500,
            positionClass: 'toast-bottom-center',
        }),
        RestangularModule.forRoot([], createRestangularConfigFactory),
        SidebarModule.forRoot()
    ],
    providers: [
        HttpClient,
        AuthentificationService,
        RoleGuardService,
        NoTimeRecordingsService,
        ProfilesService,
        UsersService,
        GroupsService,
        TrainingBonusesService,
        FormService,
        EmpowermentsService,
        BusinessesService,
        AclsService,
        CostPerYearsService,
        CustomersService,
        ContactsService,
        TypesService,
        QuotationsService,
        ProvisionsService,
        StatusesService,
        CGVsService,
        PaymentConditionsService,
        LinesService,
        SimpleLinesService,
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
