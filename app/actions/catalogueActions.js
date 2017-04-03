import * as actions from './actionTypes';

export function initCatalogue(idList) {
  return ({ type: actions.INIT_CATALOGUE, idList });
}

export function filterCatalogueByAids(aids, aidCodes) {
  return ({ type: actions.FILTER_CATALOGUE_BY_AIDS, aids, aidCodes });
}

export function updateCatalogue(idList) {
  return ({ type: actions.UPDATE_CATALOGUE, idList });
}
