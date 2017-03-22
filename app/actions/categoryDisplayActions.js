import * as actions from './actionTypes';

export function requestFetchCategoryDisplay(categoryCode) {
  return ({ type: actions.REQUEST_FETCH_CATEGORY_DISPLAY, categoryCode });
}

export function successFetchCategoryDisplay(categoryCode, result) {
  return ({ type: actions.SUCCESS_FETCH_CATEGORY_DISPLAY, categoryCode, result });
}

export function failureFetchCategoryDisplay() {
  return ({ type: actions.FAILURE_FETCH_CATEGORY_DISPLAY });
}
