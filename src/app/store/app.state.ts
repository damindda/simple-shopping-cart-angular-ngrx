import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productsReducer, getAllProducts, getPageCount, CounterState, counterReducer, getKeyword } from './products/reducers';


export interface AppState {
  products: ProductsState,
  counter: CounterState
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  counter: counterReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProductsSelector = createSelector(
  getProductsState,
  getAllProducts
);

export const getKeywordsSelector = createSelector(
  getProductsState,
  getKeyword
);

export const getCounterState = createFeatureSelector<CounterState>('counter');

export const getPageCountSelector = createSelector(
  getCounterState,
  getPageCount
);

