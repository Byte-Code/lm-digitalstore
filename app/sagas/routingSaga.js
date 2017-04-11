import { put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as actionTypes from '../actions/actionTypes';
import { getCurrentPath } from '../reducers/Router/routerSelectors';

export function* gotoSplashscreen() {
  const currentPath = yield select(getCurrentPath);
  if (currentPath !== '/') {
    yield put(push('/'));
  }
}

export default function* routingSaga() {
  yield takeEvery(actionTypes.IDLE_TIMER_COMPLETE, gotoSplashscreen);
  yield takeEvery(actionTypes.SET_STORE_ID, gotoSplashscreen);
}
