import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, share, shareReplay } from 'rxjs';
import { Product, User } from '../models/shopping-cart';
import { Store } from '@ngrx/store';
import { AppState, getPageCountSelector } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseurl = environment.BASE_URL;
  pagecount$: Observable<number> = this.store.select(getPageCountSelector);
  elementid:number = 0;

  count: number = 1;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getAllProductsData(search: string): Observable<Product[]> {

    this.pagecount$
    .subscribe((data) => {
      this.count = data;
    });
    const url = `${this.baseurl}/products?q=${search}&_page=${this.count}&_limit=10`;
    return this.http.get<Product[]>(url);
  }

  checkAuth(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users')
  }

  removeProduct(id: number): Observable<Product> {
      return this.http.delete<Product>(`http://localhost:8080/products/${id}`);

    //     .subscribe (data =>
    // {
    //   console.log('you have deleted product', item)
    //   this.store.dispatch(clearStoreDataAction());
    //   this.loadAllProductsDetails();
    // })
  }
}
