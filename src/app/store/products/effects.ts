import { Router } from '@angular/router';
import { User } from 'src/app/models/shopping-cart';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  exhaustMap,
  switchMap,
  shareReplay,
  tap,
} from 'rxjs';
import {
  getAllProductsAction,
  getAllProductsSuccessAction,
  getAllProductsErrorAction,
  startLoadingAction,
  updateCartDataAction,
  updateCartDataSuccessAction,
  checkAuthAction,
  checkAuthSuccessAction,
  checkAuthErrorAction,
  clearStoreDataAction,
  removeProductsAction,
  removeProductsSuccessAction,
} from './actions';
import { ProductsService } from 'src/app/services/products.service';

@Injectable()
export class ProductEffects {
  currentuserdata!: User;

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store,
    private router: Router
  ) {}

  loadProductsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllProductsAction),
      switchMap((actions) => {
        this.store.dispatch(startLoadingAction());
        return this.productsService.getAllProductsData(actions.keyword).pipe(
          map((products) => getAllProductsSuccessAction({ data: products })),
          shareReplay(1),
          catchError(() =>
            of(
              getAllProductsErrorAction({
                error: 'there is an error while getting data',
              })
            )
          )
        );
      })
    );
  });

  loadFilteredProductsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCartDataAction),
      switchMap((actions) => {
        this.store.dispatch(clearStoreDataAction());
        this.store.dispatch(startLoadingAction());
        return this.productsService.getAllProductsData(actions.keyword).pipe(
          map((products) => updateCartDataSuccessAction({ data: products })),
          catchError(() =>
            of(
              getAllProductsErrorAction({
                error: 'there is an error while getting data',
              })
            )
          )
        );
      })
    );
  });

  checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkAuthAction),
      exhaustMap((actions) => {
        return this.productsService.checkAuth().pipe(
          map((elements) =>
            elements.filter(
              (element) => element.email.toLowerCase() === actions.email
            )
          ),
          map((data) => {
            const [firstelement] = data;
            if (typeof firstelement !== 'undefined') {
              return checkAuthSuccessAction({ user: firstelement });
            } else {
              return checkAuthErrorAction({error: "there is an error"});
            }

          }),
          catchError(() =>
            of(
              checkAuthErrorAction({
                error: 'there is an error while getting data',
              })
            )
          )
        );
      })
    );
  });

  checkAuthSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(checkAuthSuccessAction),
        tap((data) => {
          localStorage.clear();
          localStorage.setItem('userData', JSON.stringify(data.user));
          this.router.navigate(['/products']);
        }),
        catchError(() =>
        of(
          checkAuthErrorAction({
            error: 'there is an error while getting data',
          })
        )
      )
      );
    },
    { dispatch: false }
  );


  adminRemoveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeProductsAction),
      exhaustMap((actions) => {
        return this.productsService.removeProduct(actions.product.id).pipe(
          map(() => {
            return removeProductsSuccessAction( {id: actions.product.id });
          }),
          catchError(() =>
            of(
              checkAuthErrorAction({
                error: 'there is an error while getting data',
              })
            )
          )
        );
      })
    );
  });

}
