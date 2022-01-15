import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  baseurl = environment.GET_ALL_PRODUCTS;

  constructor(private http: HttpClient) {}

  getAllProductsData(): Observable<Product[]> {
    const url = `${this.baseurl}`;
    return this.http.get<Product[]>(url);
  }
}
