import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   private baseUrl = `${environment.apiBaseUrl}/api/customers`;

  constructor(private http: HttpClient) {}

  // ➕ Add customer
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, customer);
  }

  // ✏️ Update customer
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, customer);
  }

  // 👁️ Get single customer
  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // 📋 Get all customers
  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // ❌ Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
