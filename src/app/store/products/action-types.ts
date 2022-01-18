export enum ProductsActionTypes {
  START_LOADING = '[LOADING] Start Loading',
  STOP_LOADING = '[LOADING] Stop Loading',
  CLEAR_STORE_DATA = '[CLEAR DATA] Clear Products',
  UPDATE_KEYWORD = '[KEYWORD] Update Keyword',
  GET_ALL_PRODUCTS = '[PRODUCTS PAGE] Get All Products',
  GET_ALL_PRODUCTS_SUCCESS = '[PRODUCTS PAGE] Products Load Success',
  GET_ALL_PRODUCTS_ERROR = '[PRODUCTS PAGE] Products Load Error',
  UPDATE_PRODUCTS = '[PRODUCTS PAGE] Update Products',
  UPDATE_PRODUCTS_SUCCESS = '[PRODUCTS PAGE] Update Products Success',
  PAGE_COUNTER = '[PAGE COUNTER] Increment Counter',
  PAGE_COUNTER_DOWN = '[PAGE COUNTER] Decrement Counter',
  CHECK_AUTH = '[USER] Check Login User Auth',
  CHECK_AUTH_SUCCESS = '[USER] Login User Auth Success',
  CHECK_AUTH_ERROR = '[USER] Login User Auth Error',
  GET_ALL_USERS = '[USER] Get All Users',
  CURRENT_USER = '[USER] Current User',
  ADD_SHOPPING_CART_ITEMS = '[SHOPPING CART] Add Shopping Cart Items',
  ADMIN_REMOVE_PRODUCT = '[ADMIN] Remove Product Item',
  ADMIN_REMOVE_PRODUCT_SUCCESS = '[ADMIN] Remove Product Item',
  REMOVE_SHOPPING_CART_ITEMS = '[SHOPPING CART] Remove Shopping Cart Items'

}
