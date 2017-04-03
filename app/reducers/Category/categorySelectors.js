export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAids(state, categoryCode) {
  return state.getIn([categoryCode, 'sellingAids', 0]);
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']);
}
