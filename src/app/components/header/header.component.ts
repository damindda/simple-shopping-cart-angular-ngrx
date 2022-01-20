import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCurrentUserNameSelector, getCurrentUserRoleSelector, getLoggedInStatusSelector, getShoppingCartItemsLengthSelector } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<any> = this.store.select(getCurrentUserNameSelector);
  currentUserRole$: Observable<any> = this.store.select(getCurrentUserRoleSelector);
  shoppingCartLength$: Observable<number> = this.store.select(getShoppingCartItemsLengthSelector);
  isLoggedIn$: Observable<boolean> = this.store.select(getLoggedInStatusSelector);
  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
  }


  userSignOut() {
    this.router.navigateByUrl('login');
  }

}
