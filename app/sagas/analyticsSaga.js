import { take, race, takeEvery, call, put, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import AnalyticsService from '../analytics/AnalyticsService';
import * as analyticsAction from '../actions/analyticsActions';
import { PROD_ACTION_DEDAIL, PROD_CLICK } from '../actions/actionTypes';
import {
  getFilterInfoFromCategory,
  getFilterMap,
  getFiltersCategoryCode,
  getCatalogueProducts,
  getWorldName,
  getCategoryName,
  getRoutingData } from '../reducers/selectors';

export default function* analyticsSaga() {
  yield takeEvery([
    'SUCCESS_FETCH_WORLD',
    'IDLE_TIMER_COMPLETE',
    'START_ANALYTICS_SESSION',
    'SUCCESS_FETCH_PRODUCT',
    'SUCCESS_FETCH_PRODUCTLIST',
    'START_ANALYTICS_PRODUCT',
    'TOGGLE_AID',
    'APPLY_TEMP_FILTERS',
    'TOGGLE_AVAILABILITY',
    'TOGGLE_FILTER',
    'RESET_FILTERS',
    'TRACK_ANALYTICS_FILTERS',
    'SET_ANALYTICS_PRODUCT_CLICK',
    'TRACK_PRODUCT_CLICK'
  ], function* callAnalyticsSession() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const {
        // eslint-disable-next-line no-unused-vars
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

      if (idleTimerComplete) {
        yield call(AnalyticsService.deleteInDataLayer, idleTimerComplete.type);
      }

      if (setProduct) {
        const { pathArray = '' } = yield call(getPageNameData, state);

        const prodCode = setProduct.result.get('code');
        const prodName = setProduct.result.get('name');
        yield call(AnalyticsService.setPageName, 'product', { prodCode, prodName, pathArray });
        yield call(AnalyticsService.setProduct, { product: setProduct.result, PROD_ACTION_DEDAIL });
      }

      if (setRelatedProduct) {
        const {
          categoryCode = '',
          categoryName = '',
          worldName = '',
          pathArray = '' } = yield call(getCategoryData, state);

        if (pathArray[0] === 'catalogue') {
          yield call(AnalyticsService.setPageName, 'catalogue', { worldName, pathArray, categoryCode, categoryName });
        }
        const params = { products: setRelatedProduct.result, pathArray };
        yield call(AnalyticsService.setRelatedProduct, params);
      }

      if (filters) {
        const { pathArray = '' } = yield call(getPageNameData, state);
        const { sellingAids, filterGroup } = yield select(getFilterInfoFromCategory);
        const catCode = yield select(getFiltersCategoryCode);
        const productList = yield getCatalogueProducts()(state, catCode);
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

        yield call(AnalyticsService.setRelatedProduct, { products: productList, pathArray });
        yield put(analyticsAction.trackAnalyticsFilters());
      }

      if (resetFilters) {
        const { pathArray = '' } = yield call(getPageNameData, state);
        const catCode = yield select(getFiltersCategoryCode);
        const productList = yield getCatalogueProducts()(state, catCode);
        const productsNumber = productList.size;

        yield call(AnalyticsService.clearFilters, productsNumber);
        yield call(AnalyticsService.setRelatedProduct, { products: productList, pathArray });
        yield put(analyticsAction.trackAnalyticsFilters());
      }

      if (startAnalyticsSession) {
        yield put(analyticsAction.setAnalyticsSessionCode());
        yield put(analyticsAction.trackAnalyticsSessionStart());
        yield call(AnalyticsService.track, 'view');
      }

      if (productClick) {
        const { pathArray = '' } = yield call(getPageNameData, state);
        const { product, index = 0 } = productClick.data;
        yield call(AnalyticsService.setProduct, { product, action: PROD_CLICK, index, pathArray });
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

function* getPageNameData() {
  const worldName = yield select(getWorldName);
  const routingData = yield select(getRoutingData);
  const path = _.trimStart(routingData.get('pathname'), '/');
  const pathArray = _.split(path, '/');
  return { worldName, pathArray };
}

function* getCategoryData(state) {
  const { pathArray, worldName } = yield call(getPageNameData, state);
  const categoryCode = _.startsWith(pathArray[1], 'CAT') ? pathArray[1] : null;
  const categoryName = categoryCode ? yield call(getCategoryName, state, categoryCode) : null;
  return { categoryCode, categoryName, worldName, pathArray };
}
