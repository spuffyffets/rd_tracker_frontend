import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customers/customer-form/customer-form.component';
import { CustomerDetailComponent } from './pages/customers/customer-detail/customer-detail.component';
import { PaymentFormComponent } from './pages/payments/payment-form/payment-form.component';
import { PendingCustomersComponent } from './pages/customers/pending-customers/pending-customers.component';
import { PaidCustomersComponent } from './pages/customers/paid-customers/paid-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDetailComponent,
    PaymentFormComponent,
    PendingCustomersComponent,
    PaidCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
