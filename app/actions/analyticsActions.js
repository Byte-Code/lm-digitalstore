import {
  SET_SESSION_CODE,
  TRACK_SESSION_START } from './actionTypes';

export function setSessionCode() {
  return ({ type: SET_SESSION_CODE });
}

export function trackSessionStart() {
  return ({ type: TRACK_SESSION_START });
}
