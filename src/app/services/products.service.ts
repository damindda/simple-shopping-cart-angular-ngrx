import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/shopping-cart';
import { Store } from '@ngrx/store';
import { AppState, getPageCountSelector } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseurl = environment.BASE_URL;
  pagecount$: Observable<number> = this.store.select(getPageCountSelector);

  count: number = 0;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getAllProductsData(): Observable<Product[]> {
    this.pagecount$.subscribe((data) => {
      this.count = data;
    });

    const url = `${this.baseurl}/products?_page=${this.count}&_limit=20`;
    return this.http.get<Product[]>(url);
  }

  getAllFilteredData(search: string): Observable<Product[]> {
    console.log('getAllFilteredData', search);
    this.pagecount$.subscribe((data) => {
      this.count = data;
    });

    const url = `${this.baseurl}/products?q=${search}`;

    console.log();
    return this.http.get<Product[]>(url);
  }
}
