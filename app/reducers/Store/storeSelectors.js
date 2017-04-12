export function getStoreInfo(state) {
  return state;
}

export function getStoreName(state) {
  return state.get('name');
}

export function getNearbyStores(state) {
  const currentStoreSlug = state.get('slug');
  return state.get('nearbyStores').filterNot(s => s.get('slug') === currentStoreSlug);
}
