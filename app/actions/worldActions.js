import * as actions from './actionTypes';

export default function fetchWorld() {
  return ({ type: actions.REQUEST_FETCH_WORLD });
}
