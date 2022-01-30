import { Product } from 'src/app/models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-products',
  templateUrl: './admin-add-products.component.html',
})
export class AdminAddProductsComponent implements OnInit {
  submitted: boolean = false;
  success: boolean = false;

  shoppingcartform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // for this particular add carts also, I could dispatch an action and create a reducer and effects,
  // hence these actions, reducers, selectors, effects have already added ealier not adding at this moment

  submitShoppingCartItems() {
    this.submitted = true;

    if (this.shoppingcartform.valid) {
      const output = {
        name: this.shoppingcartform.value.name,
        description: this.shoppingcartform.value.description,
        defaultImage: 'http://placeimg.com/640/480/cats',
        images: [
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats',
        ],
        price: this.shoppingcartform.value.price,
        discount: this.shoppingcartform.value.discount,
      };

      this.http
        .post<Product>('http://localhost:8080/products', output)
        .subscribe((data) => {
          if (data) {
            this.shoppingcartform.reset();
            this.success = true;
          }
        });
    } else {
      alert('form is not valid');
    }
  }

  get shoppingcartformvalues() {
    return this.shoppingcartform.controls;
  }
}
