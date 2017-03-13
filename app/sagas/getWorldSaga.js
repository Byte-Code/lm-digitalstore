import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import fetchWorld from '../../mocks/apiMock';

function* callFetchWorld() {
  const result = fromJS(yield call(fetchWorld));
  yield put({ type: actionTypes.SUCCESS_FETCH_WORLD, result });
}

export default function* getWorldSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_WORLD, callFetchWorld);
}
