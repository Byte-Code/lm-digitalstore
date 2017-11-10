import { fromJS, List, Set } from 'immutable';

import * as filterUtils from '../../app/utils/filterUtils';

describe('filterProductsByAid', () => {
  it('should return null when sellingAids are undefined', () => {
    const sellingAids = undefined;
    const activeAid = 'aid';
    const result = null;
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid)).toEqual(result);
  });

  it('should return null when sellingAids are empty', () => {
    const sellingAids = List();
    const activeAid = 'aid';
    const result = null;
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid)).toEqual(result);
  });

  it('should return null when no activeAid is provided', () => {
    const sellingAids = fromJS([
      { code: 'aid0', products: [0, 1, 2] },
      { code: 'aid1', products: [0, 4, 5] },
      { code: 'aid2', products: [0, 1, 9] }
    ]);
    const activeAid = undefined;
    const result = null;
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid)).toEqual(result);
  });

  it('should return a set containing only the products relative the activeId when input is valid', () => {
    const sellingAids = fromJS([
      { code: 'aid0', products: [0, 1, 2] },
      { code: 'aid1', products: [0, 4, 5] },
      { code: 'aid2', products: [0, 1, 9] }
    ]);
    const activeAid = 'aid2';
    const result = fromJS([0, 1, 9]).toSet();
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid)).toEqual(result);
  });
});

describe('getProductsByFilter', () => {
  it('should return an array containing a set of products for each active filterGroup', () => {
    const filterGroups = fromJS([
      {
        filters: [
          { code: 'filter0', products: [0, 1, 2] },
          { code: 'filter1', products: [3, 4, 5] },
          { code: 'filter2', products: [0, 1, 2] }
        ]
      },
      {
        filters: [
          { code: 'filter3', products: [0, 1, 2] },
          { code: 'filter4', products: [3, 4, 9] },
          { code: 'filter5', products: [6, 7, 8] }
        ]
      }
    ]);
    const activeFilters = fromJS(['filter1', 'filter2', 'filter4']);
    const result = [Set([3, 4, 5, 0, 1, 2]), Set([3, 4, 9])];
    expect(filterUtils.getProductsByFilter(filterGroups, activeFilters)).toEqual(result);
  });

  it('should return an empty array when filterGroups are empty', () => {
    const filterGroups = List();
    const result = [];
    const activeFilters = fromJS(['filter1', 'filter2', 'filter0']);
    expect(filterUtils.getProductsByFilter(filterGroups, activeFilters)).toEqual(result);
  });
});

describe('filterProducts', () => {
  it('should intersect the result of getProductsByFilter when input is valid', () => {
    const filterGroups = fromJS([
      {
        filters: [
          { code: 'filter0', products: [0, 1, 2] },
          { code: 'filter1', products: [3, 4, 5] },
          { code: 'filter2', products: [0, 1, 2] }
        ]
      },
      {
        filters: [
          { code: 'filter3', products: [0, 1, 2] },
          { code: 'filter4', products: [3, 4, 9] },
          { code: 'filter5', products: [6, 7, 8] }
        ]
      }
    ]);
    const activeFilters = fromJS(['filter1', 'filter2', 'filter4']);
    const getProductsByFilterResult = [Set([3, 4, 5, 0, 1, 2]), Set([3, 4, 9])];
    const result = Set.intersect(getProductsByFilterResult); // Set([3, 4]);
    expect(filterUtils.filterProducts(filterGroups, activeFilters)).toEqual(result);
  });

  it('should return null no active filters are provided', () => {
    const filterGroups = fromJS([
      {
        filters: [
          { code: 'filter0', products: [0, 1, 2] },
          { code: 'filter1', products: [3, 4, 5] },
          { code: 'filter2', products: [0, 1, 2] }
        ]
      },
      {
        filters: [
          { code: 'filter3', products: [0, 1, 2] },
          { code: 'filter4', products: [3, 4, 9] },
          { code: 'filter5', products: [6, 7, 8] }
        ]
      }
    ]);
    const result = null;
    expect(filterUtils.filterProducts(filterGroups)).toEqual(result);
  });
});

describe('filterByAvailability', () => {
  it('should return a set containing only the available productsID in catalogueStock and availability is active', () => {
    const productList = fromJS([
      { code: '0' },
      { code: '1' },
      { code: '2' },
      { code: '3' }
    ]);
    const catalogueStock = fromJS({ 0: 2, 1: 3, 2: 0, 3: 0 });
    const activeAvailability = true;
    const result = Set(['0', '1']);
    expect(filterUtils.filterProductsByAvailability(
      productList,
      activeAvailability,
      catalogueStock)
    ).toEqual(result);
  });

  it('should return a set with all the productsID when productsList is defined and availability is false', () => {
    const productList = fromJS([
      { code: '0' },
      { code: '1' },
      { code: '2' },
      { code: '3' }
    ]);
    const catalogueStock = fromJS({ 0: 2, 1: 3, 2: 0, 3: 0 });
    const activeAvailability = false;
    const result = Set(['0', '1', '2', '3']);
    expect(filterUtils.filterProductsByAvailability(
      productList,
      activeAvailability,
      catalogueStock
    )).toEqual(result);
  });

  it('should return an empty Set when productList is undefined', () => {
    const productList = undefined;
    const result = Set();
    expect(filterUtils.filterProductsByAvailability(productList)).toEqual(result);
  });
});

describe('filterCatalogue', () => {
  it('should return the intersection of all sets if idsByAids and idsByFilters are defined', () => {
    const idsByAids = fromJS([0, 1]);
    const idsByFilters = fromJS([0, 6, 9]);
    const idsByAvailability = fromJS([0, 9, 12]);
    const result = Set([0]);
    expect(filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)).toEqual(result);
  });

  it('should return the intersection of only idsByFilters and idsByAvailability if idsByAids are not defined', () => {
    const idsByAids = null;
    const idsByFilters = fromJS([0, 6, 9]);
    const idsByAvailability = fromJS([0, 9, 12]);
    const result = Set([0, 9]);
    expect(filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)).toEqual(result);
  });

  it('should return the intersection of only idsByAids and idsByAvailability if idsByFilters are not defined', () => {
    const idsByAids = fromJS([0]);
    const idsByFilters = null;
    const idsByAvailability = fromJS([0, 9, 12]);
    const result = Set([0]);
    expect(filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)).toEqual(result);
  });

  it('should return idsByAvailability if idsByAids and idsByFilters are not defined', () => {
    const idsByAids = null;
    const idsByFilters = null;
    const idsByAvailability = fromJS([0, 9, 12]);
    const result = Set([0, 9, 12]);
    expect(filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)).toEqual(result);
  });
});

describe('isValidList', () => {
  it('should return true when input is valid', () => {
    const list = fromJS([0, 1]);
    expect(filterUtils.isValidList(list)).toBe(true);
  });

  it('should return null when input is not defined', () => {
    const list = null;
    expect(filterUtils.isValidList(list)).toBeNull();
  });

  it('should return false when input is an empty list', () => {
    const list = List();
    expect(filterUtils.isValidList(list)).toBe(false);
  });
});
