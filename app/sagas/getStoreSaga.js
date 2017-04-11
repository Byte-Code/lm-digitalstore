import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as storeActions from '../actions/storeActions';

export function* callFetchStore() {
  try {
    const result = fromJS(yield call(apiV1.getStore.bind(apiV1)));
    yield put(storeActions.successFetchStore(result));
  } catch (error) {
    yield put(storeActions.failureFetchStore());
  }
}

export default function* getStoreSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_STORE, callFetchStore);
}
