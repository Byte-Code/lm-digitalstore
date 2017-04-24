import { fromJS, List, Set } from 'immutable';

// AIDS
export function buildAid(query) {
  const aids = query.aids ? decodeURIComponent(query.aids) : '';
  return aids;
}

export function filterProductsByAid(sellingAids, activeAid) {
  if (!sellingAids || sellingAids.isEmpty()) {
    return Set();
  }
  if (!activeAid) {
    return sellingAids.reduce((acc, val) => acc.push(val.get('products')), List()).flatten().toSet();
  }
  return sellingAids.find(a => a.get('code') === activeAid).get('products').toSet();
}

// FILTERS
export function buildFilters(query) {
  if (query.filters) {
    return fromJS(decodeURIComponent(query.filters).split('&'));
  } return List();
}

export function getAllFilterProducts(filterGroups) {
  if (filterGroups) {
    return filterGroups.map(g => (g.get('filters')
      .reduce((acc, f) => acc.push(f.get('products')), List()))
    ).flatten().toSet();
  } return Set();
}

export function getProductsByFilter(filterGroups, activeFilters) {
  return filterGroups.map(g =>
    g.get('filters').reduce((acc, f) => {
      if (activeFilters.includes(f.get('code'))) {
        return acc.push(f.get('products'));
      }
      return acc;
    }, List()).flatten().toSet()
  ).filterNot(f => f.isEmpty()).toArray();
}

export function filterProducts(filterGroups, activeFilters) {
  if (!activeFilters || activeFilters.isEmpty()) {
    return getAllFilterProducts(filterGroups);
  }
  return Set.intersect(getProductsByFilter(filterGroups, activeFilters));
}

// AVAILABILITY
export function buildAvailability(query) {
  return query.available === true;
}

export function filterProductsByAvailability(productList) {
  if (productList) {
    return productList
    .filter(p => p.get('storeStock') > 0)
    .map(p => p.get('code'))
    .toSet();
  } return Set();
}
