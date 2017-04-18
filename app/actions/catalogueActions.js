import * as actions from './actionTypes';

export function requestFetchProducts(categoryCode, productIDList) {
  return ({ type: actions.REQUEST_FETCH_PRODUCTS, categoryCode, productIDList });
}

export function successFetchProducts(categoryCode, productList) {
  return ({ type: actions.SUCCESS_FETCH_PRODUCTS, categoryCode, productList });
}

export function failureFetchProducts(error) {
  return ({ type: actions.FAILURE_FETCH_PRODUCTS, error });
}
