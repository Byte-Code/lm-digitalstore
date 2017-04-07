import { List } from 'immutable';

export function getProductsToShow(state, categoryCode, productIDList) {
  if (state.hasIn([categoryCode, 'products'])) {
    return state.getIn([categoryCode, 'products']).filter(p => productIDList.contains(p.get('code')));
  }
  return List();
}

export function getIdsToFetch(state, categoryCode, idsByFilters, idsByAids) {
  return idsByAids.intersect(idsByFilters);
}
