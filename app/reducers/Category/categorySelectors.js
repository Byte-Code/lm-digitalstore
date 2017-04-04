import { List } from 'immutable';

export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAid(state, categoryCode, activeAid) {
  let result;
  if (state.hasIn([categoryCode, 'sellingAidsProducts'])) {
    result = state.getIn([categoryCode, 'sellingAidsProducts', 0, 'aids']).find(aid => aid.get('code') === activeAid);
  }
  return result ? result.get('products') : List();
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']);
}
