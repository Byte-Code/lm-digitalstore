import * as actions from './actionTypes';

export function requestFetchProducts(categoryCode) {
  return ({ type: actions.REQUEST_FETCH_PRODUCTS, categoryCode });
}

export function successFetchProducts(categoryCode, productList) {
  return ({ type: actions.SUCCESS_FETCH_PRODUCTS, categoryCode, productList });
}

export function failureFetchProducts() {
  return ({ type: actions.FAILURE_FETCH_PRODUCTS });
}
