import { takeEvery } from 'redux-saga/effects';
import * as constants from '../actions/actionTypes';
import * as sagaCB from '../analytics/analyticsSagaCB';

export default function* analyticsSaga() {
  yield takeEvery(
    [
      constants.TOGGLE_AID,
      constants.APPLY_TEMP_FILTERS,
      constants.TOGGLE_AVAILABILITY,
      constants.TOGGLE_FILTER
    ],
    sagaCB.applyFilterActions
  );

  yield takeEvery(constants.RESET_FILTERS, sagaCB.resetFilter);
  yield takeEvery(constants.SET_ANALYTICS_PRODUCT_CLICK, sagaCB.setProductClick);
  yield takeEvery(constants.TRACK_PRODUCT_CLICK, sagaCB.trackProductClick);
  yield takeEvery(constants.SUCCESS_FETCH_WORLD, sagaCB.setAnalyticsSession);
  yield takeEvery(constants.IDLE_TIMER_COMPLETE, sagaCB.idleTimerComplete);
  yield takeEvery(constants.START_ANALYTICS_SESSION, sagaCB.startAnalyticsSession);
  yield takeEvery(constants.SUCCESS_FETCH_PRODUCT, sagaCB.setProduct);
  yield takeEvery(constants.TRACK_CATALOGUE_PRODUCTS_CHUNK, sagaCB.trackChunkInCatalogue);
  yield takeEvery(constants.START_ANALYTICS_PRODUCT, sagaCB.startAnalyticsProduct);
  yield takeEvery(constants.TRACK_ANALYTICS_FILTERS, sagaCB.trackFilters);
  yield takeEvery(constants.TRACK_STORE_AVAILABILITY_EVENT, sagaCB.trackStoreAvailability);
  yield takeEvery(constants.SUCCESS_FETCH_PRODUCTLIST, sagaCB.setRelatedProducts);
  yield takeEvery(constants.APPLY_FILTERS_IN_DATALAYER, sagaCB.applyFilterActions);
  yield takeEvery(constants.CLEAR_PRODUCT_LIST, sagaCB.clearDataLayer);
  yield takeEvery(constants.DELETE_FILTERS, sagaCB.deleteFilters);
  yield takeEvery(constants.TRACK_PURCHASE_EVENT, sagaCB.trackPurchaseEvent);
  yield takeEvery(constants.TRACK_OPEN_OVERLAY, sagaCB.trackOpenOverlay);
}
