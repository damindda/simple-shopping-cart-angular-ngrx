import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productsReducer, getAllProducts, getPageCount, getKeyword } from './products/reducers';


export interface AppState {
  products: ProductsState
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer
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


export const getPageCountSelector = createSelector(
  getProductsState,
  getPageCount
);

