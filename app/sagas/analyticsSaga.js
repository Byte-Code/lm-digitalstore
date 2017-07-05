import { take, race, takeEvery, call, put, select } from 'redux-saga/effects';
import AnalyticsService from '../analytics/AnalyticsService';
import * as analyticsAction from '../actions/analyticsActions';
import { getStoreCode, getWorldName, getCurrentPath } from '../reducers/selectors';

export default function* analyticsSaga() {
  yield takeEvery('*', function* callAnalyticsSession() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const {
        locationChange,
        setSessionData,
        idleTimerComplete,
        startAnalyticsSession,
        setProduct,
        setRelatedProduct,
        startAnalyticsProduct
      } = yield race({
        locationChange: take('@@router/LOCATION_CHANGE'),
        setSessionData: take('SUCCESS_FETCH_WORLD'),
        idleTimerComplete: take('IDLE_TIMER_COMPLETE'),
        startAnalyticsSession: take('START_ANALYTICS_SESSION'),
        setProduct: take('SUCCESS_FETCH_PRODUCT'),
        setRelatedProduct: take('SUCCESS_FETCH_PRODUCTLIST'),
        startAnalyticsProduct: take('START_ANALYTICS_PRODUCT')
      });

      if (locationChange) {
        yield call(AnalyticsService.setPageName, locationChange.payload.pathname);
      }

      if (setSessionData) {
        const storeCode = yield select(getStoreCode);
        const worldName = yield select(getWorldName);
        const location = yield select(getCurrentPath);
        yield call(AnalyticsService.setNavigationStore, storeCode);
        yield call(AnalyticsService.setCid);
        yield call(AnalyticsService.setReleaseVersion, worldName);

        if (location === '/world') {
          yield put(analyticsAction.startAnalyticsSession());
        }
      }

      if (idleTimerComplete) {
        yield call(AnalyticsService.deleteInDataLayer, idleTimerComplete.type);
      }

      if (setProduct) {
        yield call(AnalyticsService.setProduct, setProduct.result, 'detail');
      }

      if (setRelatedProduct) {
        yield call(AnalyticsService.setRelatedProduct, setRelatedProduct.result);
      }

      if (startAnalyticsSession) {
        yield put(analyticsAction.setAnalyticsSessionCode());
        yield put(analyticsAction.trackAnalyticsSessionStart());
        yield call(AnalyticsService.track, 'view');
      }

      if (startAnalyticsProduct) {
        yield call(AnalyticsService.track, 'view');
      }

      // disable multiple calls https://github.com/redux-saga/redux-saga/issues/471
      return;
    }
  });
}
