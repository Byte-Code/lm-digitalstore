import * as actions from './actionTypes';

export function requestFetchProduct(productCode) {
  return ({ type: actions.REQUEST_FETCH_PRODUCT, productCode });
}

export function successFetchProduct(productCode, result) {
  return ({ type: actions.SUCCESS_FETCH_PRODUCT, productCode, result });
}

export function failureFetchProduct(error) {
  return ({ type: actions.FAILURE_FETCH_PRODUCT, error });
}
