import React from 'react';
import { fromJS, Map, List } from 'immutable';
import { shallow, mount } from 'enzyme';

import Catalogue from '../../app/components/Catalogue';

const params = { categoryCode: 'CAT123' };
const requestFetchCategory = jest.fn();
const initFilters = jest.fn();
const products = fromJS([
  { code: 1, mainImage: 'image1', name: 'product1', marketingAttributes: {} },
  { code: 2, mainImage: 'image2', name: 'product2', marketingAttributes: {} },
  { code: 3, mainImage: 'image3', name: 'product3', marketingAttributes: {} }
]);
const categoryInfo = fromJS({
  name: 'cat123',
  sellingAidsProducts: List(),
  facetFilters: List()
});
const router = { location: {} };
const filterMap = Map();

jest.mock('../../app/analytics/AnalyticsService');
jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

describe('catalogue', () => {
  it('should render null when categoryInfo is empty or undefined', () => {
    const result = shallow(
      <Catalogue
        params={params}
        filterMap={filterMap}
        products={products}
        requestFetchCategory={requestFetchCategory}
        router={router}
        toggleAid={() => {}}
        toggleFilter={() => {}}
        toggleAvailability={() => {}}
        resetFilters={() => {}}
        initFilters={() => {}}
        applyFilters={() => {}}
        clearProductList={() => {}}
        toggleFiltersDialog={() => {}}
        isDialogOpen
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly when categoryInfo is not empty', () => {
    const result = shallow(
      <Catalogue
        params={params}
        categoryInfo={categoryInfo}
        filterMap={filterMap}
        products={products}
        requestFetchCategory={requestFetchCategory}
        router={router}
        toggleAid={() => {}}
        toggleFilter={() => {}}
        toggleAvailability={() => {}}
        resetFilters={() => {}}
        initFilters={() => {}}
        applyFilters={() => {}}
        clearProductList={() => {}}
        toggleFiltersDialog={() => {}}
        isDialogOpen
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchCategory after mount', () => {
    mount(
      <Catalogue
        params={params}
        categoryInfo={categoryInfo}
        filterMap={filterMap}
        products={products}
        requestFetchCategory={requestFetchCategory}
        router={router}
        initFilters={initFilters}
        toggleAid={() => {}}
        toggleFilter={() => {}}
        toggleAvailability={() => {}}
        resetFilters={() => {}}
        applyFilters={() => {}}
        clearProductList={() => {}}
        toggleFiltersDialog={() => {}}
        isDialogOpen
      />
    );
    expect(initFilters).toHaveBeenCalled();
    expect(requestFetchCategory).toHaveBeenCalledWith('CAT123');
  });

  it('should call initFilters and requestFetchCategory when categoryCode changes', () => {
    const result = mount(
      <Catalogue
        params={params}
        categoryInfo={categoryInfo}
        filterMap={filterMap}
        products={products}
        router={router}
        requestFetchCategory={requestFetchCategory}
        initFilters={initFilters}
        toggleAid={() => {}}
        toggleFilter={() => {}}
        toggleAvailability={() => {}}
        resetFilters={() => {}}
        applyFilters={() => {}}
        clearProductList={() => {}}
        isDialogOpen
        toggleFiltersDialog={() => {}}
      />
    );
    const nextProps = {
      params: {
        categoryCode: 'CAT456'
      },
      products: List(),
      filterMap: Map({ filters: List() })
    };
    result.setProps(nextProps);
    expect(initFilters).toHaveBeenCalled();
    expect(requestFetchCategory).toHaveBeenCalledWith('CAT456');
  });
});
