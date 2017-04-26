import * as actions from './actionTypes';

export function requestFetchProductList(productIDList) {
  return ({ type: actions.REQUEST_FETCH_PRODUCTLIST, productIDList });
}

export function successFetchProductList(result) {
  return ({ type: actions.SUCCESS_FETCH_PRODUCTLIST, result });
}

export function failureFetchProductList(error) {
  return ({ type: actions.FAILURE_FETCH_PRODUCTLIST, error });
}

export function clearProductList() {
  return ({ type: actions.CLEAR_PRODUCT_LIST });
}
