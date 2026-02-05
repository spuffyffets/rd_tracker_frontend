import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: any;
  payments: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private router: Router
  ) {}
ngOnInit(): void {
  const paramId = this.route.snapshot.paramMap.get('id');

  // 🚨 MOST IMPORTANT GUARD
  if (!paramId) {
    return; // ❌ NO API CALL
  }

  const customerId = Number(paramId);

  if (isNaN(customerId)) {
    return; // ❌ NO API CALL
  }

  // ✅ ONLY VALID ID REACHES HERE
  this.loadCustomer(customerId);
  this.loadPayments(customerId);
}




editPayment(payment: any) {
  this.router.navigate(
    ['/payments/add', this.customer.id],
    {
      queryParams: {
        editPaymentId: payment.id
      }
    }
  );
}

deletePayment(paymentId: number) {
  if (!confirm('Are you sure you want to delete this payment?')) {
    return;
  }

  this.paymentService.deletePayment(paymentId).subscribe({
    next: () => {
      alert('Payment deleted successfully');
      this.loadPayments(this.customer.id);
    },
    error: () => {
      alert('Failed to delete payment');
    }
  });
}




  loadCustomer(id: number) {
    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: () => {
        alert('Customer not found');
        this.router.navigate(['/customers']);
      }
    });
  }

  loadPayments(customerId: number) {
    this.paymentService.getPaymentsByCustomer(customerId).subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToAddPayment() {
    this.router.navigate(['/payments/add', this.customer.id]);
  }

  goBack() {
    this.router.navigate(['/customers']);
  }
}
