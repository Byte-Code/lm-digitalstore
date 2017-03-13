import * as actions from './actionTypes';

export function fetchWorld() {
  return ({ type: actions.REQUEST_FETCH_WORLD });
}
