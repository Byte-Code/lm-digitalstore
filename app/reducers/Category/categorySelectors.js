import { List, Map } from 'immutable';

export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAids(state, categoryCode) {
  return state.getIn([categoryCode, 'sellingAidsProducts', 0, 'aids']) || Map();
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']) || List();
}

export function getOrderedProducts(state, categoryCode) {
  return state.getIn([categoryCode, 'orderedProducts']) || List();
}

export function getCategoryCode(state) {
  return state.get('categoryCode' || List());
}
