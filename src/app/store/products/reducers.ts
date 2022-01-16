import { createReducer, on } from '@ngrx/store';
import {
  getAllProductsAction,
  getAllProductsSuccessAction,
  getAllProductsErrorAction,
  pageLoadCounterAction,
  updateCartDataAction,
  updateCartDataSuccessAction
} from './actions';
import { Product } from 'src/app/models/shopping-cart';

export interface ProductsState {
  error: any;
  data: Product[];
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ProductsState = {
  error: null,
  data: [],
  status: 'pending',
}

export interface CounterState {
  pagecount: number
}

export const initialCounterState: CounterState = {
  pagecount: 1
}

export const productsReducer = createReducer(
  initialState,
  on(getAllProductsAction, (state) => ({...state, status: 'loading' })),
  on(getAllProductsSuccessAction, (state, { data} ) => ({
    ...state,
    data: [...state.data, ...data],
    status: 'success'
  })),
  on(updateCartDataAction, (state, { keyword } ) => ({
    ...state,
    keyword: keyword,
    status: 'loading'
  })),
  on(updateCartDataSuccessAction, (state, { data} ) => ({
    ...state,
    data: data,
    status: 'success'
  })),
  on(getAllProductsErrorAction, (state, { error }) => ({...state, error: error }))
)

export const counterReducer = createReducer(
  initialCounterState,
  on(pageLoadCounterAction, (state) => ({
    ...state,
    pagecount: state.pagecount + 1
  }))
)

export const getAllProducts = (productstate: ProductsState) => productstate.data;
export const getPageCount = (counterstate: CounterState) => counterstate.pagecount;

