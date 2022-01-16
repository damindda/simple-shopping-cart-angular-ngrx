import { Product } from './../../../models/shopping-cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import {
  getKeywordsSelector,
  getPageCountSelector,
  getProductsSelector,
} from 'src/app/store/app.state';
import {
  clearStoreDataAction,
  getAllProductsAction,
  pageLoadCounterAction,
  pageLoadCounterDownAction,
  updateCartDataAction,
} from 'src/app/store/products/actions';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsItemComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(getProductsSelector);
  keyword$: Observable<string> = this.store.select(getKeywordsSelector);
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
        console.log(' seach keyword === "" =====>', searchkeyword);
        this.store.dispatch(getAllProductsAction({ keyword: searchkeyword }));
      } else {
        console.log(' seach keyword === keyword =====>', searchkeyword);
        this.store.dispatch(updateCartDataAction({ keyword: searchkeyword }));
      }
    });
  }

  getUpdatedProductsDetails() {
    this.keyword$.subscribe((searchkeyword) => {
      this.store.dispatch(getAllProductsAction({ keyword: searchkeyword }));
    });
  }
}
