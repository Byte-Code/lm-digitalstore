import { List } from 'immutable';

export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAid(state, categoryCode, activeAid) {
  if (state.hasIn([categoryCode, 'sellingAidsProducts'])) {
    return state.getIn([categoryCode, 'sellingAidsProducts', 0, 'aids']).find(aid => aid.get('code') === activeAid).get('products');
  }
  return List();
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']);
}
