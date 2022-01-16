import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signOut() {
    console.log('sign out clicked');
  }

  cartClick() {
    console.log('cart clicked');
  }
}
