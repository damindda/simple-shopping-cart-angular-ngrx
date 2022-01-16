import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';
import { getCurrentUserNameSelector } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<any> = this.store.select(getCurrentUserNameSelector);

  isLogin = true;
  constructor(private router: Router, private store: Store) { }

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
