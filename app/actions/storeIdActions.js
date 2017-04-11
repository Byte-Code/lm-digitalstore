import * as actions from './actionTypes';

export function setStoreId(storeId) {
  return {type: actions.SET_STORE_ID, storeId}
}
