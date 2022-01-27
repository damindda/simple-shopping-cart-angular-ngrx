import { createReducer, on } from '@ngrx/store';
import * as productsActions from './actions';
import { Product, User } from 'src/app/models/shopping-cart';

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
  isLoading: boolean;
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
  user: null,
  isLoading: true
};

export const productsReducer = createReducer(
  initialState,
  on(productsActions.updateKeywordAction, (state, { keyword }) => ({
    ...state,
    error: null,
    keyword: keyword,
    isLoading: false
  })),
  on(productsActions.getAllProductsAction, (state) => ({ ...state, status: 'loading' })),
  on(productsActions.getAllProductsSuccessAction, (state, { data }) => ({
    ...state,
    error: null,
    data: [...state.data, ...data],
    status: 'success',
    isLoading: false
  })),
  on(productsActions.updateCartDataAction, (state, { keyword }) => ({
    ...state,
    error: null,
    keyword: keyword,
    status: 'loading',
  })),
  on(productsActions.updateCartDataSuccessAction, (state, { data }) => ({
    ...state,
    data: data,
    status: 'success',
    isLoading: false
  })),
  on(productsActions.getAllProductsErrorAction, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false
  })),
  on(productsActions.clearStoreDataAction, (state) => ({
    ...state,
    pagecount: 1,
  })),
  on(productsActions.pageLoadCounterAction, (state) => ({
    ...state,
    pagecount: state.pagecount + 1,
  })),
  on(productsActions.pageLoadCounterDownAction, (state) => ({
    ...state,
    error: null,
    pagecount: state.pagecount - 1,
  })),
  on(productsActions.checkAuthAction, (state) => ({
    ...state,
    error: null,
    status: 'checkingauth',
    isLoggedIn: false
  })),
  on(productsActions.checkAuthSuccessAction, (state, { user: data }) => ({
    ...state,
    error: null,
    status: 'success',
    isLoggedIn: true,
    user: data
  })),
  on(productsActions.checkAuthErrorAction, (state, { error: error }) => ({
    ...state,
    status: 'error',
    error: true,
    isLoggedIn: false,
    data: [],
    user: null
  })),
  on(productsActions.getAllUsersAction, (state, { user: data }) => ({
    ...state,
    allusers: data,
  })),
  on(productsActions.addShoppingCartItemsAction, (state, { shoppingCartItem }) => {
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
  on(productsActions.removeShoppingCartItemsAction, (state, { removeShoppingCartItem }) => {
    const filterInTheCart = state.shoppingcartitems.filter(
      (item: Product) => item.id !== removeShoppingCartItem.id
    );
    return {
      ...state,
      shoppingcartitems: [...filterInTheCart],
    };
  }),
  on(productsActions.removeProductsAction, (state, { product }) => ({
    ...state
  })),
  on(productsActions.removeProductsSuccessAction, (state, { id }) => {
    const filteredData = state.data.filter(
      (item: Product) => item.id !== id
    );
    return {
      ...state,
      data: [...filteredData],
    };
  })

);
export const getAllProducts = (productstate: ProductsState) => productstate.data;
export const getPageCount = (productstate: ProductsState) => productstate.pagecount;
export const getKeyword = (productstate: ProductsState) => productstate.keyword;
export const getCurrentUserName = (productstate: ProductsState) => productstate.user?.name?.firstName;
export const getCurrentUserRole = (productstate: ProductsState) => productstate.user?.role;
export const getShoppingCartItems = (productstate: ProductsState) => productstate.shoppingcartitems;
export const getShoppingCartItemsLength = (productstate: ProductsState) => productstate.shoppingcartitems.length;
export const getShoppingCartSubTotal = (productstate: ProductsState) => productstate.shoppingcartitems.reduce((price, currentprice) => { return price + currentprice.price}, 0);
export const getShoppingCartSum = (productstate: ProductsState) => productstate.shoppingcartitems.reduce((price, currentprice) => { return price + currentprice.price}, 0);
export const getLogInFormErrorSelector = (productstate: ProductsState) => productstate.error;
export const getLoggedInStatus = (productstate: ProductsState) => productstate.isLoggedIn;
export const getIsLoading = (productstate: ProductsState) => productstate.isLoading;


