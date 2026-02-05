import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup;
  errorMessage = '';

  editMode = false;
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // build form
    this.customerForm = this.fb.group({
      accountNo: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      openingDate: ['', Validators.required],
      monthlyAmount: ['', Validators.required]
    });

    // check edit mode
    this.route.queryParams.subscribe(params => {
      if (params['editId']) {
        this.editMode = true;
        this.customerId = +params['editId'];
        this.loadCustomer();
      }
    });
  }

  loadCustomer() {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        this.customerForm.patchValue(data);
      },
      error: () => {
        alert('Customer not found');
        this.router.navigate(['/customers']);
      }
    });
  }

  submit() {
    if (this.customerForm.invalid) {
      return;
    }

    if (this.editMode) {
      // UPDATE
      this.customerService.updateCustomer(this.customerId, this.customerForm.value)
        .subscribe({
          next: () => {
            alert('Customer updated successfully');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Update failed';
          }
        });
    } else {
      // ADD
      this.customerService.addCustomer(this.customerForm.value)
        .subscribe({
          next: () => {
            alert('Customer added successfully');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Add failed';
          }
        });
    }
  }
}
