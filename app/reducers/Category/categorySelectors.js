import { List, Map } from 'immutable';

import * as filterUtils from '../../utils/filterUtils';

export function getCategory(state, categoryCode) {
  return state.get(categoryCode);
}

export function getSellingAids(state, categoryCode) {
  return state.getIn([categoryCode, 'sellingAidsProducts', 0, 'aids']) || Map();
}

export function getFilters(state, categoryCode) {
  return state.getIn([categoryCode, 'facetFilters']) || List();
}

export function getOrderedProducts(state, categoryCode) {
  return state.getIn([categoryCode, 'orderedProducts']) || List();
}

export function getFilteredIDs(state, filterMap) {
  const activeAid = filterMap.get('aid');
  const activeFilters = filterMap.get('filters');
  const activeAvailability = filterMap.get('availability');
  const categoryCode = filterMap.get('categoryCode');
  const sellingAids = getSellingAids(state, categoryCode);
  const filterGroups = getFilters(state, categoryCode);
  const orderedProducts = getOrderedProducts(state, categoryCode);
  const idsByAids = filterUtils.filterProductsByAid(sellingAids, activeAid);
  const idsByFilters = filterUtils.filterProducts(filterGroups, activeFilters);
  const idsByAvailability = filterUtils.filterProductsByAvailability(
    orderedProducts,
    activeAvailability
  );
  return filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability);
}
