import { List } from 'immutable';

export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAids(state, categoryCode) {
  if (state.hasIn([categoryCode, 'sellingAidsProducts'])) {
    return state.getIn([categoryCode, 'sellingAidsProducts', 0, 'aids']);
  }
  return List();
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']) || List();
}
