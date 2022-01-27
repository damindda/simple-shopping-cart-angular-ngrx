import { HttpClient } from '@angular/common/http';
import { Cart, Product, ProductSelection, ProductSelectionNew } from './../../../models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentUserRoleSelector,
  getIsLoadingSelector,
  getKeywordsSelector,
  getPageCountSelector,
  getProductsSelector,
} from 'src/app/store/app.state';
import {
  addShoppingCartItemsAction,
  clearStoreDataAction,
  getAllProductsAction,
  pageLoadCounterAction,
  pageLoadCounterDownAction,
  removeProductsAction,
  updateCartDataAction,
} from 'src/app/store/products/actions';
import { getIsLoading } from 'src/app/store/products/reducers';

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
    // this.loadAllProductsDetails();
  }

  onScrollDown() {

    this.store.dispatch(pageLoadCounterAction());

    this.getUpdatedProductsDetails();
  }

  onScrollUp() {
    this.store.dispatch(pageLoadCounterDownAction());
  }

  loadAllProductsDetails() {

    this.pagecount$.subscribe((data) => {
      this.count = data;
    });

    this.keyword$.subscribe((searchkeyword) => {
      if (!searchkeyword) {
        this.store.dispatch(getAllProductsAction({ keyword: searchkeyword, count: this.count }));
      } else {
        this.store.dispatch(updateCartDataAction({ keyword: searchkeyword, count: this.count }));
      }
    });
  }

  getUpdatedProductsDetails() {
    this.keyword$.subscribe((searchkeyword) => {
      this.store.dispatch(getAllProductsAction({ keyword: searchkeyword, count: this.count }));
    });
  }

  addToCart(item: Product) {

    const newItem: Cart = {
      id: item.id,
      products: [
        {
          id: item.id,
          quantity: 1,
        },
      ],
    };

    const newProductSelection: ProductSelection = {
      id: item.id,
      quantity: 1,
    }

    // console.log('newItem', newItem);
    // console.log('item', item);
    // console.log('newProductSelection', newProductSelection);

    const newItemOne: ProductSelectionNew = {
      id: item.id,
      name: item.name,
      images: item.defaultImage,
      price: item.price,
      quantity: 1,
    };

    const quantity = {
      qty: 1
    }

    const newItemTwo: Product = {...item, ...quantity};

    console.log('newItemTwo', newItemTwo);

    this.store.dispatch(addShoppingCartItemsAction({ shoppingCartItem: newItemTwo }));
  }

  editProduct(item: Product) {
    alert('have not implemented this edit feature');
  }

  removeProduct(item: Product) {
    this.store.dispatch(removeProductsAction({ product: item }));
  }
}
