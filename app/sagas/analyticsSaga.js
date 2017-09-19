import { take, race, takeEvery, call, put, select } from 'redux-saga/effects';
import AnalyticsService from '../analytics/AnalyticsService';
import * as analyticsAction from '../actions/analyticsActions';
import * as constants from '../actions/actionTypes';
import analyticsEventList from '../analytics/AnalyticsEventList';
import {
  getFilterInfoFromCategory,
  getFilterMap,
  getFiltersCategoryCode,
  getCatalogueProducts,
  getProductReducer,
} from '../reducers/selectors';
import { getPageNameData, getCategoryData } from './analyticsSaga.utility';

export function* analyticsSaga() {
  yield takeEvery(analyticsEventList, callAnalyticsSession);
}

export function* callAnalyticsSession() {
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
      trackProductClick,
      trackStoreAvailability
    } = yield race({
      setSessionData: take(constants.SUCCESS_FETCH_WORLD),
      idleTimerComplete: take(constants.IDLE_TIMER_COMPLETE),
      startAnalyticsSession: take(constants.START_ANALYTICS_SESSION),
      setProduct: take(constants.SUCCESS_FETCH_PRODUCT),
      setRelatedProduct: take(constants.SUCCESS_FETCH_PRODUCTLIST),
      startAnalyticsProduct: take(constants.START_ANALYTICS_PRODUCT),
      filters: take([
        constants.TOGGLE_AID,
        constants.APPLY_TEMP_FILTERS,
        constants.TOGGLE_AVAILABILITY,
        constants.TOGGLE_FILTER
      ]),
      resetFilters: take(constants.RESET_FILTERS),
      trackFilters: take(constants.TRACK_ANALYTICS_FILTERS),
      productClick: take(constants.SET_ANALYTICS_PRODUCT_CLICK),
      trackProductClick: take(constants.TRACK_PRODUCT_CLICK),
      trackStoreAvailability: take(constants.TRACK_STORE_AVAILABILITY_EVENT)
    });

    const state = yield select();
    const { pathArray = '' } = yield call(getPageNameData, state);

    if (idleTimerComplete) {
      yield call(AnalyticsService.deleteInDataLayer, idleTimerComplete.type);
      yield put(analyticsAction.successDeleteInDataLayer());
    }

    if (setProduct) {
      const prodCode = setProduct.result.get('code');
      const prodName = setProduct.result.get('name');
      yield call(AnalyticsService.setPageName, 'product', {
        prodCode,
        prodName,
        pathArray
      });
      yield call(AnalyticsService.setProduct, {
        product: setProduct.result,
        action: [constants.PROD_ACTION_DEDAIL]
      });
      yield put(analyticsAction.successSetProductInDataLayer());
    }

    if (setRelatedProduct) {
      const {
        categoryCode = '',
        categoryName = '',
        worldName = '',
      } = yield call(getCategoryData, state);

      if (pathArray[0] === 'catalogue') {
        yield call(AnalyticsService.setPageName, 'catalogue', {
          worldName,
          pathArray,
          categoryCode,
          categoryName
        });
        yield put(analyticsAction.successSetPageName());
      }
      const params = { products: setRelatedProduct.result, pathArray };
      yield call(AnalyticsService.setRelatedProduct, params);
      yield put(analyticsAction.successSetRelatedProductInDataLayer());
    }

    if (filters) {
      const { sellingAids, filterGroup } = yield select(getFilterInfoFromCategory);
      const catCode = yield select(getFiltersCategoryCode);
      const productList = yield call(getCatalogueProducts(), state, catCode);
      const productsNumber = productList.size;
      const activeFilters = yield select(getFilterMap);


      yield call(AnalyticsService.setFilters, {
        sellingAids,
        filterGroup,
        productsNumber,
        activeFilters
      });

      yield call(AnalyticsService.setRelatedProduct, {
        products: productList,
        pathArray
      });
      yield put(analyticsAction.trackAnalyticsFilters());
    }

    if (resetFilters) {
      const catCode = yield select(getFiltersCategoryCode);
      const productList = yield getCatalogueProducts()(state, catCode);
      const productsNumber = productList.size;

      yield call(AnalyticsService.clearFilters, productsNumber);
      yield call(AnalyticsService.setRelatedProduct, {
        products: productList,
        pathArray
      });
      yield put(analyticsAction.trackAnalyticsFilters());
    }

    if (startAnalyticsSession) {
      yield call(AnalyticsService.track, 'view');
      yield put(analyticsAction.successStartAnalyticsSession());
    }

    if (productClick) {
      const { product, index = 0 } = productClick.data;
      yield call(AnalyticsService.setProduct, {
        product,
        action: [constants.PROD_CLICK],
        index,
        pathArray
      });
      yield put(analyticsAction.trackProductClick());
    }

    if (startAnalyticsProduct) {
      yield call(AnalyticsService.track, 'view');
      yield put(analyticsAction.successStartAnalyticsProduct());
    }

    if (trackFilters) {
      yield call(AnalyticsService.track, 'view');
      yield put(analyticsAction.successTrackFilters());
    }

    if (trackProductClick) {
      yield call(AnalyticsService.track, 'link');
      yield put(analyticsAction.successTrackProductClick());
    }

    if (trackStoreAvailability) {
      const {
        storeName = '',
        storeStock = 0,
      } = trackStoreAvailability.storeData;
      const product = yield select(getProductReducer);

      yield call(AnalyticsService.setStoreAvailability, {
        storeName,
        storeStock,
        product
      });
      yield call(AnalyticsService.track, 'link');
      yield put(analyticsAction.successTrackAvailabilityButton());
    }

    // disable multiple calls https://github.com/redux-saga/redux-saga/issues/471
    return;
  }
}

