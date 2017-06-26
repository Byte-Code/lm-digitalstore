import { takeEvery, put } from 'redux-saga/effects';
import * as analyticsAction from '../actions/analyticsActions';
import * as analyticsActionTypes from '../actions/actionTypes';

function* callAnalyticsSession() {
  yield put(analyticsAction.setAnalyticsSessionCode());
  yield put(analyticsAction.trackAnalyticsSessionStart());
}

export default function* analyticsSaga() {
  yield takeEvery(analyticsActionTypes.START_ANALYTICS_SESSION, callAnalyticsSession);
}
