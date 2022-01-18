import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/shopping-cart';
import { removeShoppingCartItemsAction } from 'src/app/store/products/actions';
import { Observable } from 'rxjs';
import { getShoppingCartItemsSelector } from 'src/app/store/app.state';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  shoppingCartItems$: Observable<Product[]> = this.store.select(getShoppingCartItemsSelector);
  isShoppingCartVisible: boolean = true;
  constructor(private store: Store) { }

  ngOnInit(): void {

    this.shoppingCartItems$.subscribe(data => {
      if(data.length === 0) {
        this.isShoppingCartVisible = false;
      } else {
        this.isShoppingCartVisible = true;
      }
    })
  }

  removeFromCart(item: Product) {
    this.store.dispatch(removeShoppingCartItemsAction({ removeShoppingCartItem: item }));
  }

}
