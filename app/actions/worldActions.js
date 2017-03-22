import * as actions from './actionTypes';

export function requestFetchWorld() {
  return ({ type: actions.REQUEST_FETCH_WORLD });
}

export function successFetchWorld(result) {
  return ({ type: actions.SUCCESS_FETCH_WORLD, result });
}

export function failureFetchWorld() {
  return ({ type: actions.FAILURE_FETCH_WORLD });
}
