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

export function resetFilters() {
  return { type: actionTypes.RESET_FILTERS };
}

export function initFilters() {
  return { type: actionTypes.INIT_FILTERS };
}

export function toggleTempFilter(newFilter) {
  return { type: actionTypes.TOGGLE_TEMP_FILTER, newFilter };
}

export function toggleTempAvailability() {
  return { type: actionTypes.TOGGLE_TEMP_AVAILABILITY };
}

export function applyTempFilters() {
  return { type: actionTypes.APPLY_TEMP_FILTERS };
}

export function resetTempFilters() {
  return { type: actionTypes.RESET_TEMP_FILTERS };
}

export function initTempFilters() {
  return { type: actionTypes.INIT_TEMP_FILTERS };
}

export function toggleFiltersDialog() {
  return { type: actionTypes.TOGGLE_FILTERS_DIALOG };
}
