import * as actions from './actionTypes';

export function setStoreCode(storeCode) {
  return {type: actions.SET_STORE_CODE, storeCode}
}
