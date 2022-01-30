import { HttpClient } from '@angular/common/http';
import { Product } from './../../../models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentUserRoleSelector,
  getKeywordsSelector,
  getPageCountSelector,
  getProductsSelector,
} from 'src/app/store/app.state';
import {
  addShoppingCartItemsAction,
  getAllProductsAction,
  pageLoadCounterAction,
  removeProductsAction,
  updateCartDataAction,
} from 'src/app/store/products/actions';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
})
export class ProductsItemComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(getProductsSelector);
  keyword$: Observable<string> = this.store.select(getKeywordsSelector);

  pagecount$: Observable<number> = this.store.select(getPageCountSelector);

  currentUserRole$: Observable<any> = this.store.select(
    getCurrentUserRoleSelector
  );
  count: number = 0;

  constructor(private store: Store, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllProductsDetails();
  }

  onScrollDown() {
    this.store.dispatch(pageLoadCounterAction());
    this.getUpdatedProductsDetails();
  }

  loadAllProductsDetails() {
    this.pagecount$.subscribe((data) => {
      this.count = data;
    });

    this.keyword$.subscribe((searchkeyword) => {
      if (!searchkeyword) {
        this.store.dispatch(
          getAllProductsAction({ keyword: searchkeyword, count: this.count })
        );
      } else {
        this.store.dispatch(
          updateCartDataAction({ keyword: searchkeyword, count: this.count })
        );
      }
    });
  }

  getUpdatedProductsDetails() {
    this.keyword$.subscribe((searchkeyword) => {
      this.store.dispatch(
        getAllProductsAction({ keyword: searchkeyword, count: this.count })
      );
    });
  }

  addToCart(item: Product) {
    const quantity = {
      qty: 1,
    };
    const itemWithQty: Product = { ...item, ...quantity };
    this.store.dispatch(
      addShoppingCartItemsAction({ shoppingCartItem: itemWithQty })
    );
  }

  editProduct(item: Product) {
    alert('have not implemented this edit feature');
  }

  removeProduct(item: Product) {
    this.store.dispatch(removeProductsAction({ product: item }));
  }
}
