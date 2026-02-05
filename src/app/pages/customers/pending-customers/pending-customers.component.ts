import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { PendingCustomer } from '../../../core/models/pending-customer.model';

@Component({
  selector: 'app-pending-customers',
  templateUrl: './pending-customers.component.html',
  styleUrls: ['./pending-customers.component.css']
})
export class PendingCustomersComponent implements OnInit {

  selectedMonth!: string;
  pendingCustomers: PendingCustomer[] = [];
  loading = false;

  months: { label: string; value: string }[] = [];

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildMonthList();
    this.loadPending();
  }

  // ✅ Build months from Feb 2026 to current month
  private buildMonthList() {
    const start = new Date(2026, 1); // Feb 2026 (0 = Jan)
    const today = new Date();

    while (start <= today) {
      const year = start.getFullYear();
      const month = String(start.getMonth() + 1).padStart(2, '0');

      const value = `${year}-${month}`; // ✅ SAFE: YYYY-MM
      const label = start.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });

      this.months.push({ label, value });
      start.setMonth(start.getMonth() + 1);
    }

    // ✅ default = current month (YYYY-MM)
    const currYear = today.getFullYear();
    const currMonth = String(today.getMonth() + 1).padStart(2, '0');
    this.selectedMonth = `${currYear}-${currMonth}`;
  }

  loadPending() {
    if (!this.selectedMonth) return;

    this.loading = true;
    this.pendingCustomers = [];

    this.paymentService
      .getPendingCustomersByMonth(this.selectedMonth)
      .subscribe({
        next: (data) => {
          this.pendingCustomers = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load pending customers');
        }
      });
  }

  addPayment(customerId: number) {
    this.router.navigate(['/payments/add', customerId]);
  }
}
