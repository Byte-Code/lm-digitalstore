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

export function setSellingAids(categoryCode, productIDList) {
  return ({ type: actions.SET_SELLING_AIDS, categoryCode, productIDList });
}

export function setFilters(categoryCode, productIDList) {
  return ({ type: actions.SET_FILTERS, categoryCode, productIDList });
}
