import { Product } from './../../../models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import { getProductsSelector } from 'src/app/store/app.state';
import { getAllProductsAction, pageLoadCounterAction } from 'src/app/store/products/actions';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {

  products$: Observable<Product[]> = this.store.select(getProductsSelector);

  isloading = true;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  onScroll() {
    this.store.dispatch(pageLoadCounterAction());
    this.loadProducts();
  }

  loadProducts() {
    this.store.dispatch(getAllProductsAction());
  }



}
