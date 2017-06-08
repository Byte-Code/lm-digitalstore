import { createSelector } from 'reselect';
import { List } from 'immutable';

export function getProduct(state, productCode) {
  return state.get(productCode);
}

export const getAllStoreStock = createSelector([getProduct], productInfo => {
  if (productInfo) {
    return productInfo.get('allStoreStock') || List();
  }
  return List();
});
