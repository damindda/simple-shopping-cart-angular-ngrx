import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedInStatusSelector } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean> = this.store.select(getLoggedInStatusSelector);

  isLoggedIn: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.isLoggedIn$.subscribe(value => this.isLoggedIn = value);
  }

  canActivate(): boolean {

      if(this.isLoggedIn) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }

  }


}
