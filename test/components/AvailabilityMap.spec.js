import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import AvailabilityMap, { StoreBadge } from '../../app/components/AvailabilityMap';

describe('AvailabilityDialog', () => {
  const productCode = '123';
  const productName = 'abc';
  const nearbyStoreStock = fromJS([
    {
      code: '123',
      name: 'abc',
      address: {
        state: 'abc',
        street: 'bde',
        streetNumber: '1',
        zipCode: '213',
        city: 'milan'
      }
    },
    {
      code: '1234',
      name: 'asdsa',
      address: {
        state: 'asd',
        street: 'bae',
        streetNumber: '1',
        zipCode: '213',
        city: 'roma'
      }
    }
  ]);
  const result = shallow(
    <AvailabilityDialog
      productCode={productCode}
      productName={productName}
      nearbyStoreStock={nearbyStoreStock}
    />
  );

  it('should initially render without a selected store', () => {
    expect(result.state('selectedStore')).toEqual(-1);
    expect(result).toMatchSnapshot();
  });

  it('should render the selected store once it is clicked', () => {
    result.find(StoreBadge).at(0).simulate('click');
    expect(result.state('selectedStore')).toEqual('123');
    expect(result).toMatchSnapshot();
  });

  it('should update the selected store once a different one is clicked', () => {
    result.find(StoreBadge).at(1).simulate('click');
    expect(result.state('selectedStore')).toEqual('1234');
    expect(result).toMatchSnapshot();
  });
});
