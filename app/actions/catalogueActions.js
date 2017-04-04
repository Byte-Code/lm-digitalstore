import * as actions from './actionTypes';

export function updateCatalogue(categoryCode, productList) {
  return ({ type: actions.UPDATE_CATALOGUE, categoryCode, productList });
}
