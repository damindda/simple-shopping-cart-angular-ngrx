import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userAuth() {
    console.log('sign out clicked');
    this.router.navigateByUrl('login');
  }

  cartClick() {
    console.log('cart clicked');
  }
}
