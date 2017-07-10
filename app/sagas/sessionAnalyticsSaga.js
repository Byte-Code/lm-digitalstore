import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import AnalyticsService from '../analytics/AnalyticsService';
import { getStoreCode, getWorldName, getRoutingData } from '../reducers/selectors';
import * as analyticsAction from '../actions/analyticsActions';

export function* setAnalyticsSession() {
  const {
    worldName = '',
    pathArray = '' } = yield call(getPageNameData);

  const storeCode = yield select(getStoreCode);

  if (pathArray[0] === 'world') {
    yield call(AnalyticsService.setPageName, 'session', { worldName, pathArray });
    yield call(AnalyticsService.setNavigationStore, storeCode);
    yield call(AnalyticsService.setCid);
    yield call(AnalyticsService.setReleaseVersion, worldName);
    yield put(analyticsAction.startAnalyticsSession());
  }
}

export default function* sessionAnalyticsSaga() {
  yield takeEvery('SUCCESS_FETCH_WORLD', setAnalyticsSession);
}

function* getPageNameData() {
  const worldName = yield select(getWorldName);
  const routingData = yield select(getRoutingData);
  const path = _.trimStart(routingData.get('pathname'), '/');
  const pathArray = _.split(path, '/');
  return { worldName, pathArray };
}

