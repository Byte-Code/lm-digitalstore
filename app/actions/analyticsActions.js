import {
  SET_ANALYTICS_SESSION_CODE,
  TRACK_ANALYTICS_SESSION_START,
  START_ANALYTICS_SESSION,
  START_ANALYTICS_PRODUCT,
  TRACK_ANALYTICS_FILTERS,
  SET_ANALYTICS_PRODUCT_CLICK,
  TRACK_PRODUCT_CLICK,
  TRACK_STORE_AVAILABILITY_EVENT } from './actionTypes';

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
