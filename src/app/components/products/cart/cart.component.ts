import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/shopping-cart';
import { removeShoppingCartItemsAction } from 'src/app/store/products/actions';
import { Observable } from 'rxjs';
import { getShoppingCartItemsSelector, getShoppingCartSubTotalSelector, getShoppingCartSumSelector } from 'src/app/store/app.state';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  shoppingCartItems$: Observable<Product[]> = this.store.select(getShoppingCartItemsSelector);
  shoppingCartSum$: Observable<number> = this.store.select(getShoppingCartSumSelector);
  shoppingCartSubTotal$: Observable<number> = this.store.select(getShoppingCartSubTotalSelector);
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

  get subtotal() {
    return 1;


      // return this.items.reduce((sum,x)=>
      // ({quantity:1,
      //   priceWhenBought:sum.priceWhenBought+x.quantity*x.priceWhenBought}),
      // {quantity:1,priceWhenBought:0}).priceWhenBought;


  }


  // private get total$(): Observable<Totals> {
  //   return this.cart$.pipe(
  //     map(items => {
  //       let total = 0;
  //       for (const i of items) {
  //         total += i.price;
  //       }
  //       return total;
  //     }),
  //     map(cost => ({
  //       subTot: cost,
  //       tax: .034 * cost,
  //       grandTot: .034 * cost + cost
  //     })
  //     )
  //   );
  // }

}
