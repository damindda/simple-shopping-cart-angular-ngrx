import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { getProductsSelector } from 'src/app/store/app.state';
import { Product } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  products$: Observable<Product[]> = this.store.select(getProductsSelector);
  productlength!: boolean;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products$.subscribe(data => {
      console.log(data.length);
      if(data.length > 0) {
        this.productlength = true;
        console.log('true', this.productlength);
      } else {
        this.productlength = false;
        console.log('false', this.productlength);
      }
    });
  }

}
