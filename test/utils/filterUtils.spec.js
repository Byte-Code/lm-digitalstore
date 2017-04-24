import { fromJS, List, Set } from 'immutable';

import * as filterUtils from '../../app/utils/filterUtils';

describe('buildAid', () => {
  it('should return a decoded string when the input is valid', () => {
    const query = { aids: 'aid1%3D1' };
    const result = 'aid1=1';
    expect(filterUtils.buildAid(query)).toEqual(result);
  });

  it('should return an empty string when the input is invalid', () => {
    const query = {};
    const result = '';
    expect(filterUtils.buildAid(query)).toEqual(result);
  });
});

describe('filterProductsByAid', () => {
  it('should return an empty Set when sellingAids are undefined', () => {
    const sellingAids = undefined;
    const activeAid = 'aid';
    const result = Set();
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid))
      .toEqual(result);
  });

  it('should return an empty Set when sellingAids are empty', () => {
    const sellingAids = List();
    const activeAid = 'aid';
    const result = Set();
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid))
      .toEqual(result);
  });

  it('should return a set of all the unique products when no activeAid is provided', () => {
    const sellingAids = fromJS([
      { code: 'aid0', products: [0, 1, 2] },
      { code: 'aid1', products: [0, 4, 5] },
      { code: 'aid2', products: [0, 1, 9] }
    ]);
    const activeAid = undefined;
    const result = fromJS([0, 1, 2, 4, 5, 9]).toSet();
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid))
      .toEqual(result);
  });

  it('should return a set containing only the products relative the activeId when input is valid', () => {
    const sellingAids = fromJS([
      { code: 'aid0', products: [0, 1, 2] },
      { code: 'aid1', products: [0, 4, 5] },
      { code: 'aid2', products: [0, 1, 9] }
    ]);
    const activeAid = 'aid2';
    const result = fromJS([0, 1, 9]).toSet();
    expect(filterUtils.filterProductsByAid(sellingAids, activeAid))
      .toEqual(result);
  });
});


describe('buildFilters', () => {
  it('should return an empty List when input is invalid', () => {
    const query = {};
    const result = List();
    expect(filterUtils.buildFilters(query)).toEqual(result);
  });

  it('should return a list containing all the decoded filters when input is valid', () => {
    const query = { filters: 'filter1%3D1%26filter2%3D2%26filter3%3D3' };
    const result = fromJS(['filter1=1', 'filter2=2', 'filter3=3']);
    expect(filterUtils.buildFilters(query)).toEqual(result);
  });
});

describe('getAllFilterProducts', () => {
  it('should return a set of all the unique products when input is valid', () => {
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
    const result = fromJS([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).toSet();
    expect(filterUtils.getAllFilterProducts(filterGroups)).toEqual(result);
  });

  it('should return an empty Set when input is invalid', () => {
    const filterGroups = undefined;
    const result = Set();
    expect(filterUtils.getAllFilterProducts(filterGroups)).toEqual(result);
  });

  it('should return an empty Set when input is an empty List', () => {
    const filterGroups = List();
    const result = Set();
    expect(filterUtils.getAllFilterProducts(filterGroups)).toEqual(result);
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
    console.log(filterUtils.getProductsByFilter(filterGroups, activeFilters));
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


  it('should return a set of all unique products when no active filters are provided', () => {
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
    const result = fromJS([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).toSet();
    expect(filterUtils.getAllFilterProducts(filterGroups)).toEqual(result);
  });
});
