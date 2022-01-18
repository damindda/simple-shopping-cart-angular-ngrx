import { Product } from './../../../models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentUserRoleSelector,
  getKeywordsSelector,
  getProductsSelector,
} from 'src/app/store/app.state';
import {
  addShoppingCartItemsAction,
  getAllProductsAction,
  pageLoadCounterAction,
  pageLoadCounterDownAction,
  updateCartDataAction,
} from 'src/app/store/products/actions';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(getProductsSelector);
  keyword$: Observable<string> = this.store.select(getKeywordsSelector);
  currentUserRole$: Observable<any> = this.store.select(getCurrentUserRoleSelector);
  count: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadAllProductsDetails();
  }

  onScrollDown() {
    this.store.dispatch(pageLoadCounterAction());
    this.getUpdatedProductsDetails();
  }

  onScrollUp() {
    this.store.dispatch(pageLoadCounterDownAction());
  }

  loadAllProductsDetails() {
    this.keyword$.subscribe((searchkeyword) => {
      if (!searchkeyword) {
        this.store.dispatch(getAllProductsAction({ keyword: searchkeyword }));
      } else {
        this.store.dispatch(updateCartDataAction({ keyword: searchkeyword }));
      }
    });
  }

  getUpdatedProductsDetails() {
    this.keyword$.subscribe((searchkeyword) => {
      this.store.dispatch(getAllProductsAction({ keyword: searchkeyword }));
    });
  }

  addToCart(item: Product) {
      this.store.dispatch(addShoppingCartItemsAction({ shoppingCartItem: item }));
  }


  editProduct(item: Product) {

  }

  removeProduct(item: Product) {

  }

}
