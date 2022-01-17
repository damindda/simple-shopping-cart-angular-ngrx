import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkAuthAction } from 'src/app/store/products/actions';

@Component({
  selector: 'app-admin-add-products',
  templateUrl: './admin-add-products.component.html'
})
export class AdminAddProductsComponent implements OnInit {

  submitted:boolean = false;
  authform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  checkAuth() {
    this.submitted = true;
    console.log(this.authform.value);
  }

  get formvalues() {
    return this.authform.controls;
  }


}
