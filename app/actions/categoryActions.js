import * as actions from './actionTypes';

export function requestFetchCategory(categoryCode) {
  return ({ type: actions.REQUEST_FETCH_CATEGORY, categoryCode });
}

export function successFetchCategory(categoryCode, result) {
  return ({ type: actions.SUCCESS_FETCH_CATEGORY, categoryCode, result });
}

export function failureFetchCategory() {
  return ({ type: actions.FAILURE_FETCH_CATEGORY });
}
