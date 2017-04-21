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

export function requestFetchRelatedProducts(productCode) {
  return ({ type: actions.REQUEST_FETCH_RELATEDPRODUCTS, productCode });
}

export function successFetchRelatedProducts(productCode, result) {
  return ({ type: actions.SUCCESS_FETCH_RELATEDPRODUCTS, productCode, result });
}

export function failureFetchRelatedProducts(error) {
  return ({ type: actions.FAILURE_FETCH_RELATEDPRODUCTS, error });
}

export function requestFetchXSellProducts(productCode) {
  return ({ type: actions.REQUEST_FETCH_XSELLPRODUCTS, productCode });
}

export function successFetchXSellProducts(productCode, result) {
  return ({ type: actions.SUCCESS_FETCH_XSELLPRODUCTS, productCode, result });
}

export function failureFetchXSellProducts(error) {
  return ({ type: actions.FAILURE_FETCH_XSELLPRODUCTS, error });
}

export function requestFetchStoreStock(productCode) {
  return ({ type: actions.REQUEST_FETCH_STORESTOCK, productCode });
}

export function successFetchStoreStock(productCode, result) {
  return ({ type: actions.SUCCESS_FETCH_STORESTOCK, productCode, result });
}

export function failureFetchStoreStock(error) {
  return ({ type: actions.FAILURE_FETCH_STORESTOCK, error });
}
