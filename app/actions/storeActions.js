import * as actions from './actionTypes';

export function requestFetchStore() {
  return ({ type: actions.REQUEST_FETCH_STORE });
}

export function successFetchStore(result) {
  return ({ type: actions.SUCCESS_FETCH_STORE, result });
}

export function failureFetchStore() {
  return ({ type: actions.FAILURE_FETCH_STORE });
}
