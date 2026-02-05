import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingCustomer } from '../models/pending-customer.model';
import { Payment } from '../models/payment.model';
import { DashboardSummary } from '../models/DashboardSummary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

   private baseUrl = `${environment.apiBaseUrl}/api/payments`;

  constructor(private http: HttpClient) {}

  // ➕ Add payment
  addPayment(customerId: number, payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(
      `${this.baseUrl}/customer/${customerId}`,
      payment
    );
  }

  // 📜 Get payments of customer
  getPaymentsByCustomer(customerId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(
      `${this.baseUrl}/customer/${customerId}`
    );
  }

  // 👁️ Get single payment (EDIT MODE)
  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(
      `${this.baseUrl}/${paymentId}`
    );
  }

  // 🚨 Pending customers
  getPendingCustomersByMonth(month: string): Observable<PendingCustomer[]> {
    const params = new HttpParams().set('month', month);
    return this.http.get<PendingCustomer[]>(
      `${this.baseUrl}/pending`,
      { params }
    );
  }

  // ✅ Check payment status
  isPaymentDoneForMonth(
    customerId: number,
    month: string
  ): Observable<boolean> {

    const params = new HttpParams().set('month', month);

    return this.http.get<boolean>(
      `${this.baseUrl}/customer/${customerId}/month`,
      { params }
    );
  }

  // 📊 Dashboard summary
  getDashboardSummary(month: string): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      `${this.baseUrl}/dashboard/summary`,
      { params: { month } }
    );
  }

  // ✅ Paid customers
  getPaidCustomersByMonth(month: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/paid`,
      { params: { month } }
    );
  }

  // 📄 Download PDF
  downloadPaidPdf(month: string): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/paid/pdf`,
      {
        params: { month },
        responseType: 'blob'
      }
    );
  }

  // ✏️ Update payment
  updatePayment(paymentId: number, payment: any) {
    return this.http.put(
      `${this.baseUrl}/${paymentId}`,
      payment
    );
  }

  // ❌ Delete payment
  deletePayment(paymentId: number) {
    return this.http.delete(
      `${this.baseUrl}/${paymentId}`
    );
  }
}
