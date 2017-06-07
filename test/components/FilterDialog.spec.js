import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import Toggle from 'material-ui/Toggle';

import FilterDialog, { Filter } from '../../app/components/FilterDialog';

const applyTempFilters = jest.fn();
const handleClose = jest.fn();
const initTempFilters = jest.fn();
const resetTempFilters = jest.fn();
const toggleTempFilter = jest.fn();
const toggleTempAvailability = jest.fn();
const filterGroups = fromJS([
  {
    code: 'group0',
    filters: [
      { code: 'filter0', products: [0, 1, 2] },
      { code: 'filter1', products: [3, 4, 5] },
      { code: 'filter2', products: [0, 1, 2] }
    ]
  },
  {
    code: 'group1',
    filters: [
      { code: 'filter3', products: [0, 1, 2] },
      { code: 'filter4', products: [3, 4, 9] },
      { code: 'filter5', products: [6, 7, 8] }
    ]
  }
]);
const activeFilters = fromJS(['filter1']);
const result = shallow(
  <FilterDialog
    filterGroups={filterGroups}
    handleClose={handleClose}
    categoryCode="CAT123"
    applyTempFilters={applyTempFilters}
    initTempFilters={initTempFilters}
    toggleTempFilter={toggleTempFilter}
    toggleTempAvailability={toggleTempAvailability}
    resetTempFilters={resetTempFilters}
    activeFilters={activeFilters}
  />
);

describe('FilterDialog', () => {
  it('should call handleClose when the button is clicked', () => {
    result.find('#close-filterDialog').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call toggleTempFilter when a filter is clicked', () => {
    result.find(Filter).at(0).simulate('click');
    expect(toggleTempFilter).toHaveBeenCalledWith('filter0');
    expect(result).toMatchSnapshot();
  });

  it('should call toggleTempAvailability availability is toggled', () => {
    result.find(Toggle).simulate('toggle');
    expect(toggleTempAvailability).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });

  it('should reset filter when reset button is clicked', () => {
    result.find('#reset-filterDialog').simulate('click');
    expect(resetTempFilters).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });
});
