/* eslint-disable */
export function getProductsToShow(state, productIDList) {
  return state.filter(p => productIDList.contains(p.get('code'))).toList();
}
/* eslint-disable */
