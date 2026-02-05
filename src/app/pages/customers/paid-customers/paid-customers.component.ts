import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-paid-customers',
  templateUrl: './paid-customers.component.html',
  styleUrls: ['./paid-customers.component.css']
})
export class PaidCustomersComponent implements OnInit {

  selectedMonth!: string;
  paidCustomers: any[] = [];
  loading = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.selectedMonth = new Date().toISOString().slice(0, 7);
    this.loadPaidCustomers();
  }

  loadPaidCustomers() {
    this.loading = true;
    this.paidCustomers = [];

    this.paymentService
      .getPaidCustomersByMonth(this.selectedMonth)
      .subscribe({
        next: (data) => {
          this.paidCustomers = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load paid customers');
        }
      });
  }
downloadPdf() {
  this.paymentService.downloadPaidPdf(this.selectedMonth)
    .subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RD_Report_${this.selectedMonth}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
}

}
