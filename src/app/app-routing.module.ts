import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customers/customer-form/customer-form.component';
import { CustomerDetailComponent } from './pages/customers/customer-detail/customer-detail.component';
import { PaymentFormComponent } from './pages/payments/payment-form/payment-form.component';
import { PendingCustomersComponent } from './pages/customers/pending-customers/pending-customers.component';
import { PaidCustomersComponent } from './pages/customers/paid-customers/paid-customers.component';


const routes: Routes = [

  // 🏠 Dashboard
  { path: '', component: DashboardComponent },

  // 👥 Customers
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerFormComponent },

  // 📌 Month-based customer views (STATIC FIRST)
  { path: 'customers/pending', component: PendingCustomersComponent },
  { path: 'customers/paid', component: PaidCustomersComponent },

  // 👤 Customer detail (DYNAMIC LAST)
  { path: 'customers/:id', component: CustomerDetailComponent },

  // 💰 Payments
  { path: 'payments/add/:customerId', component: PaymentFormComponent },

  // ❌ Fallback
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
