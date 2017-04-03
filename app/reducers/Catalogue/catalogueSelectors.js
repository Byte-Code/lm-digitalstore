import { List } from 'immutable';

export function getAllProducts(state) {
  return state.get('allProducts');
}

export function getProductsToShow(state, activeProducts) {
  if (state.has('allProducts')) {
    return state.get('allProducts').filter(p => activeProducts.contains(p));
  }
  return List();
}
