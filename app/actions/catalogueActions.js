import * as actions from './actionTypes';

export function initCatalogue(idList) {
  return ({ type: actions.INIT_CATALOGUE, idList });
}

export function filterCatalogue(categoryCode, aidCodes) {
  return ({ type: actions.FILTER_CATALOGUE, categoryCode, aidCodes });
}

export function updateCatalogue(idList) {
  return ({ type: actions.UPDATE_CATALOGUE, idList });
}
