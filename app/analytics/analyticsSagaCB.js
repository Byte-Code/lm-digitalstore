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

const appliedFilters = (activeFilters) =>
  activeFilters.get('filters').size > 0
  || activeFilters.get('availability')
  || activeFilters.get('aid') !== '';


export function* applyFilterActions() {
  const activeFilters = yield select(getFilterMap);

  if (appliedFilters(activeFilters)) {
    const { sellingAids, filterGroup } = yield select(getFilterInfoFromCategory);
    const maxChunkLenght = 4;
    const state = yield select();
    const catCode = yield select(getFiltersCategoryCode);
    const productList = yield call(getCatalogueProducts(), state, catCode);
    const productsNumber = productList.size > maxChunkLenght ? maxChunkLenght : productList.size;

    yield call(AnalyticsService.setFilters, {
      sellingAids,
      filterGroup,
      productsNumber,
      activeFilters
    });
  }
}

export function* resetFilter() {
  const state = yield select();
  const catCode = yield select(getFiltersCategoryCode);
  const productList = yield getCatalogueProducts()(state, catCode);
  const productsNumber = productList.size;

  yield call(AnalyticsService.clearFilters, productsNumber);
}

export function* setProductClick(action) {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  const { product, index = 0 } = action.data;
  yield call(AnalyticsService.clearDataLayer);
  yield call(AnalyticsService.setProduct, {
    product,
    action: PROD_CLICK,
    index,
    pathArray
  });
  yield put(analyticsAction.trackProductClick());
}

export function* trackProductClick() {
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
  yield call(AnalyticsService.clearDataLayer);
  yield put(analyticsAction.successDeleteInDataLayer());
}

export function* setProduct(action) {
  const prodCode = action.result.getIn(['basicInfo', 'data', 'code']);
  const prodName = action.result.getIn(['basicInfo', 'data', 'name']);
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  yield call(AnalyticsService.setPageName, 'product', {
    prodCode,
    prodName,
    pathArray
  });
  yield call(AnalyticsService.setProduct, {
    product: action.result,
    action: PROD_ACTION_DEDAIL
  });
  yield put(analyticsAction.successSetProductInDataLayer());
}

export function* trackChunkInCatalogue(action) {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);
  const {
    categoryCode = '',
    categoryName = '',
    worldName = '',
    } = yield call(getCategoryData, state);

  const { products, positionIndex } = action.data;

  yield call(AnalyticsService.setPageName, 'catalogue', {
    worldName,
    pathArray,
    categoryCode,
    categoryName
  });

  yield call(AnalyticsService.setRelatedProduct, {
    products,
    pathArray,
    positionIndex
  });

  yield call(AnalyticsService.track, 'view', false);
}

export function* startAnalyticsSession() {
  yield call(AnalyticsService.track, 'view');
  yield put(analyticsAction.successStartAnalyticsSession());
}

export function* startAnalyticsProduct() {
  const state = yield select();
  const { pathArray = '' } = yield call(getPageNameData, state);

  if (pathArray[0] !== 'catalogue') {
    yield call(AnalyticsService.track, 'view');
    yield put(analyticsAction.successStartAnalyticsProduct());
  }
}

export function* setRelatedProducts(action) {
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
    yield put(analyticsAction.successSetPageName());
  }

  const params = { products: action.result, pathArray };
  yield call(AnalyticsService.setRelatedProduct, params);
  yield put(analyticsAction.successSetRelatedProductInDataLayer());
}

export function* trackFilters() {
  yield call(AnalyticsService.track, 'view');
  yield put(analyticsAction.successTrackFilters());
}

export function* trackStoreAvailability(action) {
  const {
    storeName = '',
    storeStock = 0,
    } = action.storeData;
  const product = yield select(getProductReducer);

  yield call(AnalyticsService.setStoreAvailability, {
    storeName,
    storeStock,
    product
  });
  yield call(AnalyticsService.track, 'link');
  yield put(analyticsAction.successTrackAvailabilityButton());
}

export function* trackPurchaseEvent() {
  const product = yield select(getProductReducer);
  yield call(AnalyticsService.setPurchase, product);
  yield call(AnalyticsService.track, 'link');
}

export function* trackOpenOverlay(action) {
  const productCode = action.code;
  const product = yield select(getProductReducer);
  yield call(AnalyticsService.openOverlay, productCode, product);
  yield call(AnalyticsService.track, 'link');
}

export function* clearDataLayer() {
  yield call(AnalyticsService.clearDataLayer);
}

export function* deleteFilters() {
  yield call(AnalyticsService.deleteFilters);
}
