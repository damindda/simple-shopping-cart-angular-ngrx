import { Product } from 'src/app/models/shopping-cart';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { checkAuthAction } from 'src/app/store/products/actions';

@Component({
  selector: 'app-admin-add-products',
  templateUrl: './admin-add-products.component.html',
})
export class AdminAddProductsComponent implements OnInit {
  submitted: boolean = false;
  shoppingcartform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  submitShoppingCartItems() {
    this.submitted = true;

    if(this.shoppingcartform.valid) {
      console.log('form is valid');
      const output = {
        name: this.shoppingcartform.value.name,
        description: this.shoppingcartform.value.description,
        defaultImage: 'http://placeimg.com/640/480/cats',
        images: [
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats',
          'http://placeimg.com/640/480/cats'
      ],
        price: this.shoppingcartform.value.price,
        discount: this.shoppingcartform.value.discount
     }


      console.log(output);


      this.http.post<Product>('http://localhost:8080/products', output).subscribe(data => {
        console.log('this is post data -----> ', data)
    })

    } else {
      console.log('form is not valid');
    }


  }

  get shoppingcartformvalues() {
    return this.shoppingcartform.controls;
  }
}
