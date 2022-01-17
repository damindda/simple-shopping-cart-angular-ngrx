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


  // checkAuth(email: string): Observable<User> {

  //   console.log('users email data  from checkAuth service---->', email);
  //      this.http.get<User[]>('http://localhost:8080/users').subscribe((data: any) => {
  //     // console.log('users data ---->', data);

  //     data.forEach((element: any) => {
  //       // console.log('users data element---->', element.email.toLowerCase(), email);

  //       if(element.email.toLowerCase() === email) {
  //         console.log('user email found--->', element.id);

  //         this.elementid = element.id;
  //       }


  //     });
  //   })

  //   return this.http.get<User>(`http://localhost:8080/users/${this.elementid}`);

  // }


  checkAuth(email: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users')
  }
}
