import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as worldActions from '../actions/worldActions';
import { fetchWorld } from '../../mocks/apiMock';

export function* callFetchWorld() {
  try {
    const result = fromJS(yield call(fetchWorld));
    yield put(worldActions.successFetchWorld(result));
  } catch (error) {
    yield put(worldActions.failureFetchWorld());
  }
}

export default function* getWorldSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_WORLD, callFetchWorld);
}
