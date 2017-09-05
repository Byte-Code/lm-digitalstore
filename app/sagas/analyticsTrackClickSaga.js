import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as analyticsAction from '../actions/analyticsActions';
import {
  PROD_CLICK,
  SET_ANALYTICS_PRODUCT_CLICK,
  TRACK_PRODUCT_CLICK } from '../actions/actionTypes';
import AnalyticsService from '../analytics/AnalyticsService';
import { getPageNameData } from './analyticsSaga.utility';

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

export function* analyticsTrackClickSaga() {
  yield takeEvery(SET_ANALYTICS_PRODUCT_CLICK, setProductClick);
  yield takeEvery(TRACK_PRODUCT_CLICK, trackProductClick);
}
