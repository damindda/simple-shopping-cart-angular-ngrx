import { createAction, props } from '@ngrx/store';
import { ProductsActionTypes } from './action-types';
import { Product, User } from 'src/app/models/shopping-cart';


export const updateKeywordAction = createAction(
  ProductsActionTypes.UPDATE_KEYWORD,
  props<{ keyword: string }>()
)

export const getAllProductsAction = createAction(
  ProductsActionTypes.GET_ALL_PRODUCTS,
  props<{ keyword: string, count: number }>()
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
  props<{ keyword: string, count: number }>()
)

export const updateCartDataSuccessAction = createAction(
  ProductsActionTypes.UPDATE_PRODUCTS_SUCCESS,
  props<{ data: Product[] }>()
)

export const clearStoreDataAction = createAction(
  ProductsActionTypes.CLEAR_STORE_DATA
)

export const pageLoadCounterAction = createAction(ProductsActionTypes.PAGE_COUNTER);
export const pageLoadCounterDownAction = createAction(ProductsActionTypes.PAGE_COUNTER_DOWN);
export const startLoadingAction = createAction(ProductsActionTypes.START_LOADING);
export const stopLoadingAction = createAction(ProductsActionTypes.STOP_LOADING);

export const checkAuthAction = createAction(
  ProductsActionTypes.CHECK_AUTH,
  props<{ email: string }>()
)

export const checkAuthSuccessAction = createAction(
  ProductsActionTypes.CHECK_AUTH_SUCCESS,
  props<{ user: User }>()
)

export const checkAuthErrorAction = createAction(
  ProductsActionTypes.CHECK_AUTH_ERROR,
  props<{ error: string }>()
)

export const getAllUsersAction = createAction(
  ProductsActionTypes.GET_ALL_USERS,
  props<{ user: User[] }>()
)

export const addShoppingCartItemsAction = createAction(
  ProductsActionTypes.ADD_SHOPPING_CART_ITEMS,
  props<{ shoppingCartItem: Product }>()
)

export const removeShoppingCartItemsAction = createAction(
  ProductsActionTypes.REMOVE_SHOPPING_CART_ITEMS,
  props<{ removeShoppingCartItem: Product }>()
)

export const removeProductsAction = createAction(
  ProductsActionTypes.ADMIN_REMOVE_PRODUCT,
  props<{ product: Product }>()
)

export const removeProductsSuccessAction = createAction(
  ProductsActionTypes.ADMIN_REMOVE_PRODUCT_SUCCESS,
  props<{ id: number }>()
)
