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

export function requestFetchNearbyStores(lat, lng) {
  return { type: actions.REQUEST_FETCH_NEARBYSTORES, lat, lng };
}

export function successFetchNearbyStores(result) {
  return ({ type: actions.SUCCESS_FETCH_NEARBYSTORES, result });
}

export function failureFetchNearbyStores(error) {
  return ({ type: actions.FAILURE_FETCH_NEARBYSTORES, error });
}
