import { fromJS, List, Set } from 'immutable';

// GENERAL
export function isValidList(list) {
  return list && !list.isEmpty();
}

export function filterCatalogue(idsByAids, idsByFilters, idsByAvailability) {
  let toIntersect = fromJS([idsByAvailability]);
  if (idsByAids) {
    toIntersect = toIntersect.push(idsByAids);
  }
  if (idsByFilters && idsByFilters.size > 1) {
    toIntersect = toIntersect.push(idsByFilters);
  }
  return Set.intersect(toIntersect.toJS());
}

// AIDS
export function filterProductsByAid(sellingAids, activeAid) {
  if (isValidList(sellingAids) && activeAid) {
    const selectedAid = sellingAids.find(a => a.get('code') === activeAid);
    if (selectedAid) {
      return selectedAid.get('products').toSet();
    }
  }
  return null;
}

// FILTERS
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
export function filterProductsByAvailability(productList, activeAvailability, catalogueStock) {
  if (isValidList(productList)) {
    let products = productList;
    if (activeAvailability && catalogueStock) {
      products = productList.filter(p =>
      catalogueStock.find((stock, code) => code === p.get('code')) > 0
      );
    }
    return products.map(p => p.get('code')).toSet();
  }
  return Set();
}
