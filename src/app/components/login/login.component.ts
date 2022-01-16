import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  authform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitted: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  checkAuth() {
    this.submitted = true;
    console.log('dsafhjbasfsdafsdjfsdf ', this.authform.value.email);
    console.log(this.authform.value);
    // this.router.navigateByUrl('products');

  }

  get formvalues() {
    return this.authform.controls;
  }

}
