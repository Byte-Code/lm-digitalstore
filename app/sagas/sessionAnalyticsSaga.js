import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getPageNameData } from './analyticsSaga.utility';
import AnalyticsService from '../analytics/AnalyticsService';
import { getStore } from '../reducers/selectors';
import * as analyticsAction from '../actions/analyticsActions';

export function* setAnalyticsSession() {
  const {
    worldName = '',
    pathArray = '' } = yield call(getPageNameData);

  const store = yield select(getStore);

  if (pathArray[0] === 'world') {
    yield call(AnalyticsService.setPageName, 'session', { worldName, pathArray });
    yield call(AnalyticsService.setNavigationStore, store);
    yield call(AnalyticsService.setCid);
    yield call(AnalyticsService.setReleaseVersion, worldName);
    yield put(analyticsAction.startAnalyticsSession());
  }
}

export function* sessionAnalyticsSaga() {
  yield takeEvery('SUCCESS_FETCH_WORLD', setAnalyticsSession);
}
