import React from 'react';
import { shallow } from 'enzyme';
import { Map, fromJS } from 'immutable';

import SellingAidsBadge, { Filter } from '../../app/components/SellingAidsBadge';

const emptySellingAids = Map();
const sellingAids = fromJS({
  aids: [
    { code: 'aid0', name: 'aid0', products: [0, 1, 2] },
    { code: 'aid1', name: 'aid1', products: [0, 4, 5] },
    { code: 'aid2', name: 'aid2', products: [0, 1, 9] }
  ]
});
const onToggle = jest.fn();
const activeAid = 'aid0';

describe('SellingAidsBadge', () => {
  it('should render null when sellingAids are empty', () => {
    const result = shallow(
      <SellingAidsBadge
        onToggle={onToggle}
        sellingAids={emptySellingAids}
        activeAid={activeAid}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a list of all the sellingAids otherwise', () => {
    const result = shallow(
      <SellingAidsBadge
        onToggle={onToggle}
        sellingAids={sellingAids}
        activeAid={activeAid}
      />
    );
    expect(result.find(Filter)).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });

  it('should call onToggle once a filter is clicked', () => {
    const result = shallow(
      <SellingAidsBadge
        onToggle={onToggle}
        sellingAids={sellingAids}
        activeAid={activeAid}
      />
    );
    result.find(Filter).at(0).simulate('click');
    expect(onToggle).toHaveBeenCalledWith('aid0');
  });
});
