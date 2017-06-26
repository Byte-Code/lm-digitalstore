import { take, race, takeEvery, call, put } from 'redux-saga/effects';
import AnalyticsService from '../analytics/AnalyticsService';
import * as analyticsAction from '../actions/analyticsActions';


export default function* analyticsSaga() {
  yield takeEvery('*', function* callAnalyticsSession() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const {
        locationChange,
        setStoreCode,
        setSessionCode,
        idleTimerComplete,
        startAnalyticsSession,
      } = yield race({
        locationChange: take('@@router/LOCATION_CHANGE'),
        setStoreCode: take('SET_STORE_CODE'),
        setSessionCode: take('SET_ANALYTICS_SESSION_CODE'),
        idleTimerComplete: take('IDLE_TIMER_COMPLETE'),
        startAnalyticsSession: take('START_ANALYTICS_SESSION')
      });

      if (locationChange) {
        yield call(AnalyticsService.setPageName, locationChange.payload.pathname);
      }

      if (setStoreCode) {
        yield call(AnalyticsService.setStoreCode, setStoreCode.storeCode);
      }

      if (setSessionCode) {
        yield call(AnalyticsService.setCid);
      }

      if (idleTimerComplete) {
        yield call(AnalyticsService.setStoreCode, idleTimerComplete.type);
      }

      if (startAnalyticsSession) {
        yield put(analyticsAction.setAnalyticsSessionCode());
        yield put(analyticsAction.trackAnalyticsSessionStart());
        yield call(AnalyticsService.track, 'view');
      }

      // enable multiple calls https://github.com/redux-saga/redux-saga/issues/471
      return;
    }
  });
}
