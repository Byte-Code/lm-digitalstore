import { List } from 'immutable';

export function getProductsToShow(state, categoryCode, productIds) {
  if (state.has(categoryCode)) {
    return state.get(categoryCode).filter(p => productIds.includes(p.get('code')));
  }
  return List();
}
