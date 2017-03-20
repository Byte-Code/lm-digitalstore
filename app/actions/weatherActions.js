import * as actions from './actionTypes';

export function requestFetchWeather() {
  return ({ type: actions.REQUEST_FETCH_WEATHER });
}

export function successFetchWeather(result) {
  return ({ type: actions.SUCCESS_FETCH_WEATHER, result });
}
export function failureFetchWeather() {
  return ({ type: actions.FAILURE_FETCH_WEATHER });
}
