import { put, call, select, takeEvery } from 'redux-saga/effects';
import AnalyticsService from '../analytics/AnalyticsService';
import {
  getFilterInfoFromCategory,
  getFilterMap,
  getFiltersCategoryCode,
  getCatalogueProducts,
} from '../reducers/selectors';
import { getPageNameData } from './analyticsSaga.utility';
import * as analyticsAction from '../actions/analyticsActions';
import { TOGGLE_AID, APPLY_TEMP_FILTERS, TOGGLE_AVAILABILITY,
  TOGGLE_FILTER, RESET_FILTERS } from '../actions/actionTypes';

function* applyFilterActions() {
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

function* resetFilter() {
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

export default function* analyticsFilterSaga() {
  yield takeEvery([
    TOGGLE_AID,
    APPLY_TEMP_FILTERS,
    TOGGLE_AVAILABILITY,
    TOGGLE_FILTER
  ], applyFilterActions);

  yield takeEvery(RESET_FILTERS, resetFilter);
}
