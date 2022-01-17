import { createReducer, on } from '@ngrx/store';
import {
  getAllProductsAction,
  getAllProductsSuccessAction,
  getAllProductsErrorAction,
  pageLoadCounterAction,
  updateCartDataAction,
  updateCartDataSuccessAction,
  updateKeywordAction,
  clearStoreDataAction,
  pageLoadCounterDownAction,
  addShoppingCartItemsAction,
  removeShoppingCartItemsAction,
  checkAuthAction,
  checkAuthActionSuccessAction,
  getAllUsersAction,
} from './actions';
import { Product, User } from 'src/app/models/shopping-cart';
import { state } from '@angular/animations';

export interface ProductsState {
  error: any;
  data: Product[];
  keyword: string;
  status: 'pending' | 'loading' | 'error' | 'success' | 'checkingauth';
  pagecount: number;
  allusers: User[];
  shoppingcartitems: Product[];
  isLoggedIn: boolean;
  user: User | null;
}

export const initialState: ProductsState = {
  error: null,
  data: [],
  keyword: '',
  status: 'pending',
  pagecount: 1,
  allusers: [],
  shoppingcartitems: [],
  isLoggedIn: false,
  user: null
};

export const productsReducer = createReducer(
  initialState,
  on(updateKeywordAction, (state, { keyword }) => ({
    ...state,
    keyword: keyword,
  })),
  on(getAllProductsAction, (state) => ({ ...state, status: 'loading' })),
  on(getAllProductsSuccessAction, (state, { data }) => ({
    ...state,
    data: [...state.data, ...data],
    status: 'success',
  })),
  on(updateCartDataAction, (state, { keyword }) => ({
    ...state,
    keyword: keyword,
    status: 'loading',
  })),
  on(updateCartDataSuccessAction, (state, { data }) => ({
    ...state,
    data: data,
    status: 'success',
  })),
  on(getAllProductsErrorAction, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(clearStoreDataAction, (state) => ({
    ...state,
    pagecount: 1,
  })),
  on(pageLoadCounterAction, (state) => ({
    ...state,
    pagecount: state.pagecount + 1,
  })),
  on(pageLoadCounterDownAction, (state) => ({
    ...state,
    pagecount: state.pagecount - 1,
  })),
  on(checkAuthAction, (state) => ({
    ...state,
    status: 'checkingauth',
    isLoggedIn: false
  })),
  on(checkAuthActionSuccessAction, (state, { user: data }) => ({
    ...state,
    status: 'success',
    isLoggedIn: true,
    user: data
  })),
  on(getAllUsersAction, (state, { user: data }) => ({
    ...state,
    allusers: data,
  })),
  on(addShoppingCartItemsAction, (state, { shoppingCartItem }) => {
    const addToShoppingCart = [...state.shoppingcartitems];
    const isAlreadyIntheCart = addToShoppingCart.find(
      (iteminthearray: Product) => iteminthearray.id === shoppingCartItem.id
    );
    if (isAlreadyIntheCart !== undefined) {
      return state;
    }
    addToShoppingCart.push(shoppingCartItem);
    return {
      ...state,
      shoppingcartitems: [...addToShoppingCart],
    };
  }),
  on(removeShoppingCartItemsAction, (state, { removeShoppingCartItem }) => {
    const filterInTheCart = state.shoppingcartitems.filter(
      (item: Product) => item.id !== removeShoppingCartItem.id
    );
    return {
      ...state,
      shoppingcartitems: [...filterInTheCart],
    };
  })
);
export const getAllProducts = (productstate: ProductsState) => productstate.data;
export const getPageCount = (productstate: ProductsState) => productstate.pagecount;
export const getKeyword = (productstate: ProductsState) => productstate.keyword;
export const getCurrentUserName = (productstate: ProductsState) => productstate.user?.name?.firstName;
export const getCurrentUserRole = (productstate: ProductsState) => productstate.user?.role;
export const getShoppingCartItems = (productstate: ProductsState) => productstate.shoppingcartitems;
export const getShoppingCartItemsLength = (productstate: ProductsState) => productstate.shoppingcartitems.length
export const getLoggedInStatus = (productstate: ProductsState) => productstate.isLoggedIn;


