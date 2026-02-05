import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  paymentForm!: FormGroup;
  customerId!: number;

  // ✏️ edit mode
  editPaymentId?: number;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ get customer id
    const customerParam = this.route.snapshot.paramMap.get('customerId');
    if (!customerParam) {
      this.router.navigate(['/customers']);
      return;
    }

    this.customerId = Number(customerParam);

    // default = current month
    const currentMonth = new Date().toISOString().slice(0, 7);

    // ✅ build form
    this.paymentForm = this.fb.group({
      paymentMonth: [currentMonth, Validators.required],
      amountPaid: ['', Validators.required],
      paymentMode: ['CASH', Validators.required]
    });

    // ✅ check edit mode
    const editId = this.route.snapshot.queryParamMap.get('editPaymentId');
    if (editId) {
      this.editPaymentId = Number(editId);
      this.loadPaymentForEdit();
    }
  }

  // 🔁 load payment when editing
  loadPaymentForEdit() {
    this.paymentService.getPaymentById(this.editPaymentId!)
      .subscribe({
        next: (payment) => {
          this.paymentForm.patchValue({
            paymentMonth: payment.paymentMonth,
            amountPaid: payment.amountPaid,
            paymentMode: payment.paymentMode
          });
        },
        error: () => {
          alert('Failed to load payment');
          this.cancel();
        }
      });
  }

  // ✅ ADD / EDIT submit
  submit() {

    if (this.paymentForm.invalid) {
      return;
    }

    this.errorMessage = '';

    // ✏️ EDIT MODE
    if (this.editPaymentId) {

      this.paymentService
        .updatePayment(this.editPaymentId, this.paymentForm.value)
        .subscribe({
          next: () => {
            alert('Payment updated successfully');
            this.router.navigate(['/customers', this.customerId]);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Update failed';
          }
        });

    }
    // ➕ ADD MODE
    else {

      this.paymentService
        .addPayment(this.customerId, this.paymentForm.value)
        .subscribe({
          next: () => {
            alert('Payment added successfully');
            this.router.navigate(['/customers', this.customerId]);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Payment failed';
          }
        });

    }
  }

  cancel() {
    this.router.navigate(['/customers', this.customerId]);
  }
}
