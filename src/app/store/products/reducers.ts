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
  getCurrentUserAction,
  addShoppingCartItemsAction,
  removeShoppingCartItemsAction,
} from './actions';
import { Product, User } from 'src/app/models/shopping-cart';
import { state } from '@angular/animations';

export interface ProductsState {
  error: any;
  data: Product[];
  keyword: string;
  status: 'pending' | 'loading' | 'error' | 'success';
  pagecount: number;
  currentuser: User | null;
  shoppingcartitems: Product[];
}

export const initialState: ProductsState = {
  error: null,
  data: [],
  keyword: '',
  status: 'pending',
  pagecount: 1,
  currentuser: null,
  shoppingcartitems: [],
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
  on(getCurrentUserAction, (state, { user: data }) => ({
    ...state,
    currentuser: data,
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
export const getPageCount = (counterstate: ProductsState) => counterstate.pagecount;
export const getKeyword = (productstate: ProductsState) => productstate.keyword;
export const getCurrentUserName = (counterstate: ProductsState) => counterstate.currentuser?.name?.firstName;
export const getCurrentUserRole = (counterstate: ProductsState) => counterstate.currentuser?.role;
export const getShoppingCartItems = (counterstate: ProductsState) => counterstate.shoppingcartitems;
export const getShoppingCartItemsLength = (counterstate: ProductsState) => counterstate.shoppingcartitems.length


