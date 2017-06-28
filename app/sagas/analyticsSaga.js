import { take, race, takeEvery, call, put, select } from 'redux-saga/effects';
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
        setProduct,
        setRelatedProduct,
        startAnalyticsProduct
      } = yield race({
        setStoreCode: take('SET_STORE_CODE'),
        locationChange: take('@@router/LOCATION_CHANGE'),
        setSessionCode: take('SET_ANALYTICS_SESSION_CODE'),
        idleTimerComplete: take('IDLE_TIMER_COMPLETE'),
        startAnalyticsSession: take('START_ANALYTICS_SESSION'),
        setProduct: take('SUCCESS_FETCH_PRODUCT'),
        setRelatedProduct: take('SUCCESS_FETCH_PRODUCTLIST'),
        startAnalyticsProduct: take('START_ANALYTICS_PRODUCT')
      });

      const state = yield select();
      yield call(AnalyticsService.setState, state);

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
        yield call(AnalyticsService.deleteInDataLayer, idleTimerComplete.type);
      }

      if (setProduct) {
        yield call(AnalyticsService.setProduct, setProduct.result);
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
