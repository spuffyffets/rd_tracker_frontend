import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { DashboardSummary } from '../../core/models/DashboardSummary.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  appName = 'Surekha RD Manager';

  selectedMonth!: string;
  summary?: DashboardSummary;
  loading = false;

  constructor(
    private router: Router,
    private paymentService: PaymentService
  ) {}

  // 🔁 INIT
  ngOnInit(): void {
    this.selectedMonth = new Date().toISOString().slice(0, 7);
    this.loadSummary();
  }

  // 🔁 LOAD DASHBOARD SUMMARY
  loadSummary() {
    this.loading = true;

    this.paymentService
      .getDashboardSummary(this.selectedMonth)
      .subscribe({
        next: (data) => {
          this.summary = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load dashboard summary');
        }
      });
  }

  // 🚀 NAVIGATION
  goToAddCustomer() {
    this.router.navigate(['/customers/add']);
  }

  goToCustomerList() {
    this.router.navigate(['/customers']);
  }

  goToPendingCustomers() {
    this.router.navigate(['/customers/pending']);
  }


// Add these methods to your existing dashboard.component.ts:

getCurrentDate(): Date {
  return new Date();
}

selectCurrentMonth(): void {
  const today = new Date();
  this.selectedMonth = today.getFullYear() + '-' + 
    (today.getMonth() + 1).toString().padStart(2, '0');
  this.loadSummary();
}

getCollectionPercentage(): number {
  if (!this.summary || this.summary.totalExpected === 0) {
    return 0;
  }
  return (this.summary.totalCollected / this.summary.totalExpected) * 100;
}

// // Optional methods for stats section (you can implement based on your data)
// getPendingCount(): number {
//   // This should come from your backend
//   return Math.ceil((this.summary?.totalPending || 0) / 1000); // Example calculation
// }

// getPaidCount(): number {
//   // This should come from your backend
//   return Math.ceil((this.summary?.totalCollected || 0) / 1000); // Example calculation
// }

// getTotalCustomers(): number {
//   // This should come from your backend
//   return this.getPendingCount() + this.getPaidCount(); // Example calculation
// }



}
