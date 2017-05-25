import { fromJS, List, Set } from 'immutable';

// GENERAL
export function isValidList(list) {
  return list && !list.isEmpty();
}

export function buildFilterMap(query, categoryCode) {
  return fromJS({
    activeAid: buildAid(query),
    activeFilters: buildFilters(query),
    activeAvailability: buildAvailability(query),
    categoryCode
  });
}

export function filterCatalogue(idsByAids, idsByFilters, idsByAvailability) {
  let toIntersect = fromJS([idsByAvailability]);
  if (idsByAids) {
    toIntersect = toIntersect.push(idsByAids);
  }
  if (idsByFilters) {
    toIntersect = toIntersect.push(idsByFilters);
  }
  return Set.intersect(toIntersect.toJS());
}

// AIDS
export function buildAid(query) {
  const aids = query.aids ? decodeURIComponent(query.aids) : '';
  return aids;
}

export function filterProductsByAid(sellingAids, activeAid) {
  if (isValidList(sellingAids) && activeAid) {
    return sellingAids.find(a => a.get('code') === activeAid).get('products').toSet();
  }
  return null;
}

// FILTERS
export function buildFilters(query) {
  if (query.filters) {
    return fromJS(decodeURIComponent(query.filters).split('&'));
  }
  return List();
}

export function getProductsByFilter(filterGroups, activeFilters) {
  return filterGroups
    .map(g =>
      g
        .get('filters')
        .reduce((acc, f) => {
          if (activeFilters.includes(f.get('code'))) {
            return acc.push(f.get('products'));
          }
          return acc;
        }, List())
        .flatten()
        .toSet()
    )
    .filterNot(f => f.isEmpty())
    .toArray();
}

export function filterProducts(filterGroups, activeFilters) {
  if (isValidList(filterGroups) && isValidList(activeFilters)) {
    return Set.intersect(getProductsByFilter(filterGroups, activeFilters));
  }
  return null;
}

// AVAILABILITY
export function buildAvailability(query) {
  return query.availability === 'true';
}

export function filterProductsByAvailability(productList, activeAvailability) {
  if (isValidList(productList)) {
    let products = productList;
    if (activeAvailability) {
      products = productList.filter(p => p.get('storeStock') > 0);
    }
    return products.map(p => p.get('code')).toSet();
  }
  return Set();
}
