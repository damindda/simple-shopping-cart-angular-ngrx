import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, User } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseurl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getAllProductsData(search: string, count: number): Observable<Product[]> {
    // const url = `${this.baseurl}/products?q=${search}&_page=${count}&_limit=10`;
    const url = `${this.baseurl}/products`;

    return this.http.get<Product[]>(url);
  }

  checkAuth(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}/users`);
  }

  removeProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseurl}/products/${id}`);
  }
}
