import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { apiClient } from '../../mocks/apiMock';
import * as storeActions from '../actions/storeActions';
import * as actionTypes from '../actions/actionTypes';
import { isValidResponse } from '../utils/utils';

export function* callFetchAllActiveStore() {
  try {
    const stores = yield call(apiClient.findActiveStores);
    if (isValidResponse(stores)) {
      const result = fromJS(stores).get('content');
      yield put(storeActions.successFetchAllActiveStores(result));
    } else {
      throw new Error('Not Found Error');
    }
  } catch (error) {
    yield put(storeActions.failureFetchAllActiveStores(error));
  }
}

export default function* getAllActiveStoreSaga() {
  yield takeEvery(actionTypes.REQUEST_ALL_ACTIVE_STORES, callFetchAllActiveStore);
}
