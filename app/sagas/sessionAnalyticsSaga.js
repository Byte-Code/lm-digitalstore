import { call, takeEvery, select } from 'redux-saga/effects';
import { getPageNameData } from './analyticsSaga.utility';
import AnalyticsService from '../analytics/AnalyticsService';
import { getStoreCode } from '../reducers/selectors';
// import * as analyticsAction from '../actions/analyticsActions';

export function* setAnalyticsSession() {
  const {
    worldName = '',
    pathArray = '' } = yield call(getPageNameData);

  const storeCode = yield select(getStoreCode);


  if (pathArray[0] === 'world') {
    yield call(AnalyticsService.setPageName, 'session', { worldName, pathArray });
    // yield call(AnalyticsService.setNavigationStore, storeCode).;

    AnalyticsService.setNavigationStore(storeCode)
      .then(() => {
        AnalyticsService.setCid();
        AnalyticsService.setReleaseVersion(worldName);
        AnalyticsService.track('view');
        return '';
      })
      .catch(e => console.log(e));
  }
}

export function* sessionAnalyticsSaga() {
  yield takeEvery('SUCCESS_FETCH_WORLD', setAnalyticsSession);
}
