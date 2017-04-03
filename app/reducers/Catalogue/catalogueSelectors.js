export function getAllProducts(state) {
  return state.get('allProducts');
}

export function getProductsToShow(state) {
  return state.get('toShow');
}
