import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import Toggle from 'material-ui/Toggle';

import FilterDialog, { Filter } from '../../app/components/FilterDialog';

const applyFilters = () => {};
const handleClose = jest.fn();
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
const filterMap = fromJS({
  filters: ['filter0', 'filter5'],
  availability: null,
  aid: 'aid1',
  categoryCode: 'CAT123'
});
const result = shallow(
  <FilterDialog
    filterGroups={filterGroups}
    filterMap={filterMap}
    handleClose={handleClose}
    applyFilters={applyFilters}
  />
);

describe('FilterDialog', () => {
  it('should initialize status based on filterMap', () => {
    const newState = {
      aid: filterMap.get('aid'),
      filters: filterMap.get('filters'),
      availability: filterMap.get('availability'),
      categoryCode: filterMap.get('categoryCode')
    };
    expect(result.state()).toEqual(newState);
    expect(result).toMatchSnapshot();
  });

  it('should call handleClose when the button is clicked', () => {
    result.find('#close-filterDialog').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });

  it('should change state when a filter is clicked', () => {
    const newState = {
      aid: filterMap.get('aid'),
      filters: fromJS(['filter5']),
      availability: filterMap.get('availability'),
      categoryCode: filterMap.get('categoryCode')
    };
    result.find(Filter).at(0).simulate('click');
    expect(result.state()).toEqual(newState);
    expect(result).toMatchSnapshot();
  });

  it('should change state when availability is toggled', () => {
    const newState = {
      aid: filterMap.get('aid'),
      filters: fromJS(['filter5']),
      availability: true,
      categoryCode: filterMap.get('categoryCode')
    };
    result.find(Toggle).simulate('toggle');
    expect(result.state()).toEqual(newState);
    expect(result).toMatchSnapshot();
  });

  it('should reset filter when reset button is clicked', () => {
    const newState = {
      aid: filterMap.get('aid'),
      filters: fromJS([]),
      availability: false,
      categoryCode: filterMap.get('categoryCode')
    };
    result.find('#reset-filterDialog').simulate('click');
    expect(result.state()).toEqual(newState);
    expect(result).toMatchSnapshot();
  });
});
