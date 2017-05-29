import React from 'react';
import { fromJS, Map, List } from 'immutable';
import { shallow, mount } from 'enzyme';

import Catalogue from '../../app/components/Catalogue';

const params = { categoryCode: 'CAT123' };
const requestFetchCategory = jest.fn();
const initFilters = jest.fn();
const products = fromJS([
  { code: 1, mainImage: 'image1', name: 'product1' },
  { code: 2, mainImage: 'image2', name: 'product2' },
  { code: 3, mainImage: 'image3', name: 'product3' }
]);
const categoryInfo = fromJS({
  name: 'cat123',
  sellingAidsProducts: List(),
  facetFilters: List()
});
const router = { location: {} };
const filterMap = Map();

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
      />
    );
    const nextProps = { params: { categoryCode: 'CAT456' } };
    result.setProps(nextProps);
    expect(initFilters).toHaveBeenCalled();
    expect(requestFetchCategory).toHaveBeenCalledWith('CAT456');
  });
});
