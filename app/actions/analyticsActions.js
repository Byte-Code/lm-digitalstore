import {
  SET_ANALYTICS_SESSION_CODE,
  TRACK_ANALYTICS_SESSION_START,
  START_ANALYTICS_SESSION } from './actionTypes';

export function setAnalyticsSessionCode() {
  return ({ type: SET_ANALYTICS_SESSION_CODE });
}

export function trackAnalyticsSessionStart() {
  return ({ type: TRACK_ANALYTICS_SESSION_START });
}

export function startAnalyticsSession() {
  return ({ type: START_ANALYTICS_SESSION });
}
