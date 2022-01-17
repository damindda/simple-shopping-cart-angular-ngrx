import { User } from './../../models/shopping-cart';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserAction } from 'src/app/store/products/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  authform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitted: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private store: Store) { }

  ngOnInit(): void {

  }

  checkAuth() {
    this.submitted = true;
    console.log(this.authform.value);

    const useremail = this.authform.value.email.toLowerCase();
    // this.router.navigateByUrl('products');

    this.http.get<User[]>('http://localhost:8080/users').subscribe((data: any) => {
      // console.log('users data ---->', data);

      data.forEach((element: any) => {
        console.log('users data element---->', element.email.toLowerCase(), useremail);

        if(element.email.toLowerCase() === useremail) {
          console.log('user email found--->', element);
          const values = element;
          localStorage.setItem('currentUser', JSON.stringify(values));

          this.router.navigateByUrl('products');

          this.store.dispatch(getCurrentUserAction({ user: element }));

        }

        return;
      });
    })

  }

  get formvalues() {
    return this.authform.controls;
  }

}
