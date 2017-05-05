import React from 'react';
import { List, fromJS } from 'immutable';
import { shallow } from 'enzyme';

import AvailabilityButton, { Button } from '../../app/components/AvailabilityButton';

describe('AvailabilityButton', () => {
  const productName = 'abc';
  const productCode = '123';

  it('should render null when nearbyStoreStock is empty', () => {
    const nearbyStoreStock = List();
    const result = shallow(
      <AvailabilityButton
        productCode={productCode}
        productName={productName}
        nearbyStoreStock={nearbyStoreStock}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly with a closed dialog when nearbyStoreStock is not Empty', () => {
    const nearbyStoreStock = fromJS([0, 1, 2]);
    const result = shallow(
      <AvailabilityButton
        productCode={productCode}
        productName={productName}
        nearbyStoreStock={nearbyStoreStock}
      />
    );
    expect(result).toMatchSnapshot();
    expect(result.state('dialogOpen')).toBe(false);
  });

  it('should display a dialog when the button is clicked', () => {
    const nearbyStoreStock = fromJS([0, 1, 2]);
    const result = shallow(
      <AvailabilityButton
        productCode={productCode}
        productName={productName}
        nearbyStoreStock={nearbyStoreStock}
      />
    );
    result.find(Button).simulate('click');
    expect(result.state('dialogOpen')).toBe(true);
    expect(result).toMatchSnapshot();
  });
});
