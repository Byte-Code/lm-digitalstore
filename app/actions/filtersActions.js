import * as actionTypes from './actionTypes';

export function toggleAid(newAid) {
  return { type: actionTypes.TOGGLE_AID, newAid };
}

export function toggleFilter(newFilter) {
  return { type: actionTypes.TOGGLE_FILTER, newFilter };
}

export function toggleAvailability() {
  return { type: actionTypes.TOGGLE_AVAILABILITY };
}

export function applyFilters(filterMap) {
  return { type: actionTypes.APPLY_FILTERS, filterMap };
}

export function resetFilters() {
  return { type: actionTypes.RESET_FILTERS };
}

export function initFilters() {
  return { type: actionTypes.INIT_FILTERS };
}
