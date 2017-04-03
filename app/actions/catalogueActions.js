import * as actions from './actionTypes';

export function initCatalogue(idList) {
  return ({ type: actions.INIT_CATALOGUE, idList });
}
