import {
  SET_ANALYTICS_SESSION_CODE,
  TRACK_ANALYTICS_SESSION_START,
  START_ANALYTICS_SESSION,
  START_ANALYTICS_PRODUCT,
  TRACK_ANALYTICS_FILTERS,
  SET_ANALYTICS_PRODUCT_CLICK,
  TRACK_PRODUCT_CLICK,
  TRACK_STORE_AVAILABILITY_EVENT,
  SUCCESS_DELETE_IN_DATALAYER,
  SUCCESS_START_ANALYTICS_SESSION,
  SUCCESS_SET_PRODUCT_IN_DATALAYER,
  SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER,
  SUCCESS_SET_PAGENAME,
  SUCCESS_START_ANALYTICS_PRODUCT,
  SUCCESS_TRACK_FILTERS,
  SUCCESS_TRACK_PRODUCT_CLICK,
  SUCCESS_TRACK_AVAILABILITY_BUTTON,
  TRACK_CATALOGUE_PRODUCTS_CHUNK,
  APPLY_FILTERS_IN_DATALAYER } from './actionTypes';

export function setAnalyticsSessionCode() {
  return ({ type: SET_ANALYTICS_SESSION_CODE });
}

export function trackAnalyticsSessionStart() {
  return ({ type: TRACK_ANALYTICS_SESSION_START });
}

export function startAnalyticsSession() {
  return ({ type: START_ANALYTICS_SESSION });
}

export function startAnalyticsProduct() {
  return ({ type: START_ANALYTICS_PRODUCT });
}

export function trackAnalyticsFilters() {
  return ({ type: TRACK_ANALYTICS_FILTERS });
}

export function setAnalyticsProductClick(data) {
  return ({ type: SET_ANALYTICS_PRODUCT_CLICK, data });
}

export function trackProductClick() {
  return ({ type: TRACK_PRODUCT_CLICK });
}

export function trackStoreAvailabilityEvent(storeData) {
  return ({ type: TRACK_STORE_AVAILABILITY_EVENT, storeData });
}

export function successDeleteInDataLayer() {
  return ({ type: SUCCESS_DELETE_IN_DATALAYER });
}

export function successStartAnalyticsSession() {
  return ({ type: SUCCESS_START_ANALYTICS_SESSION });
}

export function successSetProductInDataLayer() {
  return ({ type: SUCCESS_SET_PRODUCT_IN_DATALAYER });
}

export function successSetRelatedProductInDataLayer() {
  return ({ type: SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER });
}

export function successSetPageName() {
  return ({ type: SUCCESS_SET_PAGENAME });
}

export function successStartAnalyticsProduct() {
  return ({ type: SUCCESS_START_ANALYTICS_PRODUCT });
}

export function successTrackFilters() {
  return ({ type: SUCCESS_TRACK_FILTERS });
}

export function successTrackProductClick() {
  return ({ type: SUCCESS_TRACK_PRODUCT_CLICK });
}

export function successTrackAvailabilityButton() {
  return ({ type: SUCCESS_TRACK_AVAILABILITY_BUTTON });
}

export function trackCatalogueProductsChunk(data) {
  return ({ type: TRACK_CATALOGUE_PRODUCTS_CHUNK, data });
}

export function applyFilterInDataLayer() {
  return ({ type: APPLY_FILTERS_IN_DATALAYER });
}
