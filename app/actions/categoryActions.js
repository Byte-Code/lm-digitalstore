import * as actions from './actionTypes';

export function requestFetchCategory(categoryCode, activeAid, activeFilters) {
  return ({ type: actions.REQUEST_FETCH_CATEGORY, categoryCode, activeAid, activeFilters });
}

export function successFetchCategory(categoryCode, result) {
  return ({ type: actions.SUCCESS_FETCH_CATEGORY, categoryCode, result });
}

export function successFetchCategoryProducts(categoryCode, result) {
  return ({ type: actions.SUCCESS_FETCH_CATEGORY_PRODUCTS, categoryCode, result });
}

export function failureFetchCategory(error) {
  return ({ type: actions.FAILURE_FETCH_CATEGORY, error });
}
