import { List, Set } from 'immutable';

export function getProductsByAids(state, categoryCode) {
  return state.getIn([categoryCode, 'byAids']) || Set();
}

export function getProductsByFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'byFilters']) || Set();
}

export function getProductsToShow(state, categoryCode, productIDList) {
  if (state.hasIn([categoryCode, 'products'])) {
    return state.getIn([categoryCode, 'products']).filter(p => productIDList.contains(p.get('code')));
  }
  return List();
}

export function getIdsToFetch(state, categoryCode, activeFilters) {
  if (activeFilters.isEmpty()) {
    return getProductsByAids(state, categoryCode);
  }
  return getProductsByAids(state, categoryCode)
  .intersect(getProductsByFilters, categoryCode);
}
