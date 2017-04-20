import * as actions from './actionTypes';

export function requestFetchProductList(productIDList, action, args) {
  return ({ type: actions.REQUEST_FETCH_PRODUCTLIST, productIDList, action, args });
}

export function failureFetchProductList(error) {
  return ({ type: actions.FAILURE_FETCH_PRODUCTLIST, error });
}
