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
  pageLoadCounterDownAction
} from './actions';
import { Product } from 'src/app/models/shopping-cart';

export interface ProductsState {
  error: any;
  data: Product[];
  keyword: string;
  status: 'pending' | 'loading' | 'error' | 'success';
  pagecount: number;
}

export const initialState: ProductsState = {
  error: null,
  data: [],
  keyword: '',
  status: 'pending',
  pagecount: 1
}


export const productsReducer = createReducer(
  initialState,
  on(updateKeywordAction, (state, { keyword }) => ({...state, keyword: keyword})),
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
  on(getAllProductsErrorAction, (state, { error }) => ({...state, error: error })),
  on(clearStoreDataAction, (state ) => ({
    ...state,
    pagecount: 1
  })),
  on(pageLoadCounterAction, (state) => ({
    ...state,
    pagecount: state.pagecount + 1
  })),
  on(pageLoadCounterDownAction, (state) => ({
    ...state,
    pagecount: state.pagecount - 1
  }))
)
export const getAllProducts = (productstate: ProductsState) => productstate.data;
export const getPageCount = (counterstate: ProductsState) => counterstate.pagecount;
export const getKeyword = (productstate: ProductsState) => productstate.keyword;
