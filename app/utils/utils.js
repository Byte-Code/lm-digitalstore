import { Range, List, Set } from 'immutable';

export function titleFormatter(text) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function chunkItemList(itemList, chunkSize) {
  return Range(0, itemList.count(), chunkSize)
    .map(chunkStart => itemList.slice(chunkStart, chunkStart + chunkSize));
}

// AIDS
export function buildAid(query) {
  const aids = query.aids ? decodeURIComponent(query.aids) : '';
  return aids;
}

export function filterProductsByAid(sellingAids, activeAid) {
  if (sellingAids.isEmpty()) {
    return Set();
  }
  if (!activeAid) {
    return sellingAids.reduce((acc, val) => acc.push(val.get('products')), List()).flatten().toSet();
  }
  return sellingAids.find(a => a.get('code') === activeAid).get('products').toSet();
}

// FILTERS
export function buildFilters(query) {
  const filters = query.filters ? List(query.filters.split(',')) : List();
  return filters.map(facet => decodeURIComponent(facet));
}

function getAllFilterProducts(filterGroups) {
  return filterGroups.map(g => (g.get('filters')
    .reduce((acc, f) => acc.push(f.get('products')), List()))
  ).flatten().toSet();
}

function getProductsByFilter(filterGroups, activeFilters) {
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
  if (activeFilters.isEmpty()) {
    return getAllFilterProducts(filterGroups);
  }
  return Set.intersect(getProductsByFilter(filterGroups, activeFilters));
}
