import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, exhaustMap, switchMap, concatMap } from 'rxjs';
import {
  getAllProductsAction,
  getAllProductsSuccessAction,
  getAllProductsErrorAction,
  startLoadingAction,
  updateCartDataAction,
  updateCartDataSuccessAction,
  clearStoreDataAction
} from './actions';
import { ProductsService } from 'src/app/services/products.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}

  loadProductsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllProductsAction),
      switchMap((actions) => {
        this.store.dispatch(startLoadingAction());
        return this.productsService.getAllProductsData(actions.keyword)
        .pipe(
          map((products) => getAllProductsSuccessAction({ data: products })),
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
        // this.store.dispatch(clearStoreDataAction());
        this.store.dispatch(startLoadingAction());
        return this.productsService.getAllProductsData(actions.keyword)
        .pipe(
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

}
