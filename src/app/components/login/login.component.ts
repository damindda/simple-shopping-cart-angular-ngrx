import { User } from './../../models/shopping-cart';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkAuthAction } from 'src/app/store/products/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  authform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitted: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  checkAuth() {
    this.submitted = true;
    const useremail: string = this.authform.value.email.toLowerCase();
    this.store.dispatch(checkAuthAction({ email: useremail }));
  }

  get formvalues() {
    return this.authform.controls;
  }

}


