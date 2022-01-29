import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, Observable } from 'rxjs';
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

  }


}
