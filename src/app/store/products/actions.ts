import { createAction, props } from '@ngrx/store';
import { ProductsActionTypes } from './action-types';
import { Product } from 'src/app/models/shopping-cart';

export const getAllProductsAction = createAction(
  ProductsActionTypes.GET_ALL_PRODUCTS
)

export const getAllProductsSuccessAction = createAction(
  ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS,
  props<{ data: Product[] }>()
)

export const getAllProductsErrorAction = createAction(
  ProductsActionTypes.GET_ALL_PRODUCTS_ERROR,
  props<{ error: string }>()
)

export const updateCartDataAction = createAction(
  ProductsActionTypes.UPDATE_PRODUCTS,
  props<{ keyword: string }>()
)

export const updateCartDataSuccessAction = createAction(
  ProductsActionTypes.UPDATE_PRODUCTS_SUCCESS,
  props<{ data: Product[] }>()
)

export const pageLoadCounterAction = createAction(ProductsActionTypes.PAGE_COUNTER);
export const startLoadingAction = createAction(ProductsActionTypes.START_LOADING);
export const stopLoadingAction = createAction(ProductsActionTypes.STOP_LOADING);

