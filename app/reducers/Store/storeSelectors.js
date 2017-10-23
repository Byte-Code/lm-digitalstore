import { List } from 'immutable';

export function getStoreInfo(state) {
  return state;
}

export function getStoreName(state) {
  return state.get('name');
}

export function hasNearbyStores(state) {
  if (state.get('nearbyStores')) {
    return state.get('nearbyStores').size > 1;
  }
  return false;
}

export function getNearbyStores(state, { radius = 1000 }) {
  if (state.get('nearbyStores')) {
    return state.get('nearbyStores').filter(ns => ns.get('distance') <= radius);
  }
  return List();
}
