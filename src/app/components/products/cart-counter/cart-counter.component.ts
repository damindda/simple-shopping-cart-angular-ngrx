import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/shopping-cart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html'
})
export class CartCounterComponent implements OnInit {


  @Input() item!: Product;


  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  increment() {
    console.log('this.item', this.item.qty);
    alert('not implemented');
  }

  decrement() {
    console.log('this.item', this.item);
    alert('not implemented');
  }

}
