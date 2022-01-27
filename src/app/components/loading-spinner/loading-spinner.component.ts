import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  getIsLoadingSelector,
  getProductsSelector,
} from 'src/app/store/app.state';
import { Product } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(getProductsSelector);
  isLoading$: Observable<boolean> = this.store.select(getIsLoadingSelector);

  productlength!: boolean;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$.subscribe((data) => {
      return data.length
        ? (this.productlength = true)
        : (this.productlength = false);
    });
  }
}
