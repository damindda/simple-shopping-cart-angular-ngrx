import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productsReducer, getAllProducts, getPageCount, getKeyword, getCurrentUserName, getCurrentUserRole, getShoppingCartItems, getShoppingCartItemsLength, getLoggedInStatus } from './products/reducers';


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


export const getCurrentUserNameSelector = createSelector(
  getProductsState,
  getCurrentUserName
);


export const getCurrentUserRoleSelector = createSelector(
  getProductsState,
  getCurrentUserRole
);

export const getShoppingCartItemsSelector = createSelector(
  getProductsState,
  getShoppingCartItems
);

export const getShoppingCartItemsLengthSelector = createSelector(
  getProductsState,
  getShoppingCartItemsLength
);

export const getLoggedInStatusSelector = createSelector(
  getProductsState,
  getLoggedInStatus
);



