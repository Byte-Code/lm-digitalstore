import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as worldActions from '../actions/worldActions';
import * as analyticsAction from '../actions/analyticsActions';
import { fetchWorld } from '../../mocks/apiMock';

export function* callFetchWorld() {
  try {
    const result = fromJS(yield call(fetchWorld));
    yield put(worldActions.successFetchWorld(result));
  } catch (error) {
    yield put(worldActions.failureFetchWorld(error));
  }
  yield put(analyticsAction.setSessionCode());
  yield put(analyticsAction.trackSessionStart());
}

export default function* getWorldSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_WORLD, callFetchWorld);
}

