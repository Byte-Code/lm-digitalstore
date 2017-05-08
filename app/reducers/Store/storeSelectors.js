import { List } from 'immutable';

export function getStoreInfo(state) {
  return state;
}

export function getStoreName(state) {
  return state.get('name');
}

export function getNearbyStores(state) {
  if (state.get('nearbyStores')) {
    return state.get('nearbyStores');
  } return List();
}
