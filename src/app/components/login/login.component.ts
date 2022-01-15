import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  name = new FormControl('');

  authform = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkAuth() {
    console.log(this.authform.value.name);
    this.router.navigateByUrl('products');
  }

}
