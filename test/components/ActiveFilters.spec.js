import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import ActiveFilters, { Filter, ResetButton } from '../../app/components/ActiveFilters';

describe('ActiveFilters', () => {
  const resetFilters = () => {};
  const toggleFilter = () => {};
  const toggleAvailability = () => {};
  const handleOpen = () => {};
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

  it('should render a paragrapgh when no filters are active', () => {
    const filterMap = fromJS({
      filters: [],
      availability: null
    });
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        handleOpen={handleOpen}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render any filters', () => {
    const filterMap = fromJS({
      filters: ['filter0'],
      availability: true
    });
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        handleOpen={handleOpen}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call reset filters when reset button is clicked', () => {
    const filterMap = fromJS({
      filters: ['filter0'],
      availability: true
    });
    const resetFiltersMock = jest.fn();
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFiltersMock}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        handleOpen={handleOpen}
      />
    );
    result.find(ResetButton).simulate('click');
    expect(resetFiltersMock).toHaveBeenCalled();
  });

  it('should call toggleFilter when a filter is clicked', () => {
    const filterMap = fromJS({
      filters: ['filter0'],
      availability: false
    });
    const toggleFilterMock = jest.fn();
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFilters}
        toggleFilter={toggleFilterMock}
        toggleAvailability={toggleAvailability}
        handleOpen={handleOpen}
      />
    );
    expect(result).toMatchSnapshot();
    result.find(Filter).simulate('click');
    expect(toggleFilterMock).toHaveBeenCalled();
  });

  it('should call toggleAvailability when a availability filter is clicked', () => {
    const filterMap = fromJS({
      filters: [],
      availability: true
    });
    const toggleAvailabilityMock = jest.fn();
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailabilityMock}
        handleOpen={handleOpen}
      />
    );
    expect(result).toMatchSnapshot();
    result.find(Filter).simulate('click');
    expect(toggleAvailabilityMock).toHaveBeenCalled();
  });

  it('should call handleOpen when showMore filter is clicked', () => {
    const filterMap = fromJS({
      filters: ['filter0', 'filter1', 'filter2', 'filter3'],
      availability: false
    });
    const handleOpenMock = jest.fn();
    const result = shallow(
      <ActiveFilters
        filterMap={filterMap}
        filterGroups={filterGroups}
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        handleOpen={handleOpenMock}
      />
    );
    expect(result).toMatchSnapshot();
    result.find(Filter).at(3).simulate('click');
    expect(handleOpenMock).toHaveBeenCalled();
  });
});
