import { take, race, takeEvery, call, put, select } from 'redux-saga/effects';
import AnalyticsService from '../analytics/AnalyticsService';
import * as analyticsAction from '../actions/analyticsActions';
import { PROD_ACTION_DEDAIL, PROD_CLICK } from '../actions/actionTypes';
import {
  getFilterInfoFromCategory,
  getFilterMap,
  getFiltersCategoryCode,
  getCatalogueProducts,
  getStoreCode,
  getWorldName,
  getCurrentPath } from '../reducers/selectors';

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
        startAnalyticsProduct,
        filters,
        trackFilters,
        resetFilters,
        productClick,
        trackProductClick
      } = yield race({
        locationChange: take('@@router/LOCATION_CHANGE'),
        setSessionData: take('SUCCESS_FETCH_WORLD'),
        idleTimerComplete: take('IDLE_TIMER_COMPLETE'),
        startAnalyticsSession: take('START_ANALYTICS_SESSION'),
        setProduct: take('SUCCESS_FETCH_PRODUCT'),
        setRelatedProduct: take('SUCCESS_FETCH_PRODUCTLIST'),
        startAnalyticsProduct: take('START_ANALYTICS_PRODUCT'),
        filters: take(
          [
            'TOGGLE_AID',
            'APPLY_TEMP_FILTERS',
            'TOGGLE_AVAILABILITY',
            'TOGGLE_FILTER'
          ]
        ),
        resetFilters: take('RESET_FILTERS'),
        trackFilters: take('TRACK_ANALYTICS_FILTERS'),
        productClick: take('SET_ANALYTICS_PRODUCT_CLICK'),
        trackProductClick: take('TRACK_PRODUCT_CLICK')
      });

      const state = yield select();

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
        yield call(AnalyticsService.setProduct, setProduct.result, PROD_ACTION_DEDAIL);
      }

      if (setRelatedProduct) {
        yield call(AnalyticsService.setRelatedProduct, setRelatedProduct.result);
      }

      if (filters) {
        const { sellingAids, filterGroup } = yield select(getFilterInfoFromCategory);
        const categoryCode = yield select(getFiltersCategoryCode);
        const productList = yield getCatalogueProducts()(state, categoryCode);
        const productsNumber = productList.size;
        const activeFilters = yield select(getFilterMap);

        yield call(AnalyticsService.setFilters,
          {
            sellingAids,
            filterGroup,
            productsNumber,
            activeFilters
          }
        );

        yield call(AnalyticsService.setRelatedProduct, productList);
        yield put(analyticsAction.trackAnalyticsFilters());
      }

      if (resetFilters) {
        const categoryCode = yield select(getFiltersCategoryCode);
        const productList = yield getCatalogueProducts()(state, categoryCode);
        const productsNumber = productList.size;

        yield call(AnalyticsService.clearFilters, productsNumber);
        yield call(AnalyticsService.setRelatedProduct, productList);
        yield put(analyticsAction.trackAnalyticsFilters());
      }

      if (startAnalyticsSession) {
        yield put(analyticsAction.setAnalyticsSessionCode());
        yield put(analyticsAction.trackAnalyticsSessionStart());
        yield call(AnalyticsService.track, 'view');
      }

      if (productClick) {
        const { product, index = 0 } = productClick.data;
        yield call(AnalyticsService.setProduct, { product, action: PROD_CLICK, index });
        yield put(analyticsAction.trackProductClick());
      }

      if (startAnalyticsProduct) {
        yield call(AnalyticsService.track, 'view');
      }

      if (trackFilters) {
        yield call(AnalyticsService.track, 'view');
      }

      if (trackProductClick) {
        yield call(AnalyticsService.track, 'link');
      }

      // disable multiple calls https://github.com/redux-saga/redux-saga/issues/471
      return;
    }
  });
}
