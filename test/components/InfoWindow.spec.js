import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

import InfoWindow from '../../app/components/InfoWindow';

const selectedStoreInfo = fromJS({
  code: '123',
  name: 'abc',
  latitude: 1231,
  longitude: 123213,
  address: {
    state: 'abc',
    street: 'bde',
    streetNumber: '1',
    zipCode: '213',
    city: 'milan'
  }
});
const handleClick = jest.fn();

describe('InfoWindow', () => {
  const wrapper = shallow(
    <InfoWindow handleClick={handleClick} selectedStoreInfo={selectedStoreInfo} />
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClick when BlockIcon is clicked', () => {
    wrapper.find(BlockIcon).simulate('touchTap');
    expect(handleClick).toHaveBeenCalled();
  });
});
