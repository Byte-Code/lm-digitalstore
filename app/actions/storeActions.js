import * as actions from './actionTypes';

export function setStoreCode(storeCode) {
  return { type: actions.SET_STORE_CODE, storeCode };
}

export function successFetchStore(result) {
  return ({ type: actions.SUCCESS_FETCH_STORE, result });
}

export function failureFetchStore(error) {
  return ({ type: actions.FAILURE_FETCH_STORE, error });
}
