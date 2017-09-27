import { call, put, select } from 'redux-saga/effects';
import { getPageNameData, getCategoryData } from '../sagas/analyticsSaga.utility';
import AnalyticsService from '../analytics/AnalyticsService';
import { getProductReducer,
  getFilterInfoFromCategory,
  getFilterMap,
  getFiltersCategoryCode,
  getCatalogueProducts,
  getStore } from '../reducers/selectors';
import * as analyticsAction from '../actions/analyticsActions';
import { PROD_CLICK, PROD_ACTION_DEDAIL } from '../actions/actionTypes';

export function* applyFilterActions() {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);
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

export function* resetFilter() {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);
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

export function* setProductClick(action) {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  const { product, index = 0 } = action.data;
  yield call(AnalyticsService.setProduct, {
    product,
    action: PROD_CLICK,
    index,
    pathArray
  });
  yield put(analyticsAction.trackProductClick());
}

export function* trackProductClick() {
  yield call(AnalyticsService.setTraccia, true);
  yield call(AnalyticsService.track, 'link');
  yield put(analyticsAction.successTrackProductClick());
}

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

export function* idleTimerComplete() {
  yield call(AnalyticsService.deleteInDataLayer, idleTimerComplete.type);
  yield put(analyticsAction.successDeleteInDataLayer());
}

export function* setProduct(action) {
  const prodCode = action.result.get('code');
  const prodName = action.result.get('name');
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  yield call(AnalyticsService.setPageName, 'product', {
    prodCode,
    prodName,
    pathArray
  });
  yield call(AnalyticsService.setProduct, {
    product: action.result,
    action: [PROD_ACTION_DEDAIL]
  });
  yield put(analyticsAction.successSetProductInDataLayer());
}

export function* setRelatedProductInCatalogue() {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);
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
  }
}

export function* startAnalyticsSession() {
  yield call(AnalyticsService.track, 'view');
  yield put(analyticsAction.successStartAnalyticsSession());
}

export function* startAnalyticsProduct() {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  if (pathArray[0] !== 'catalogue') {
    console.log('ciao');
    yield call(AnalyticsService.track, 'view');
    yield put(analyticsAction.successStartAnalyticsProduct());
  }
}

export function* trackFilters() {
  yield call(AnalyticsService.track, 'view');
  yield put(analyticsAction.successTrackFilters());
}

export function* trackStoreAvailability() {
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
