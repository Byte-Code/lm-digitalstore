import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import FilterBar from '../../app/components/FilterBar';

describe('filterBar', () => {
  const filterMap = fromJS({});
  const resetFilters = () => {};
  const toggleFilter = () => {};
  const toggleAvailability = () => {};

  it('should return null when filterGroups are empty', () => {
    const filterGroups = fromJS([]);
    const result = shallow(
      <FilterBar
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        filterMap={filterMap}
        filterGroups={filterGroups}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should initially render with a closed dialog', () => {
    const filterGroups = fromJS([1, 2, 3]);
    const result = shallow(
      <FilterBar
        resetFilters={resetFilters}
        toggleFilter={toggleFilter}
        toggleAvailability={toggleAvailability}
        filterMap={filterMap}
        filterGroups={filterGroups}
      />
    );
    expect(result).toMatchSnapshot();
  });
});
