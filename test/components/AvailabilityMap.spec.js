import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import mountWithStore from '../../app/utils/testingUtils';
import AvailabilityMap from '../../app/components/AvailabilityMap';
import Marker from '../../app/components/Marker';
import InfoWindow from '../../app/components/InfoWindow';

// TODO find a way to test user interactions
const productCode = '123';
const productName = 'abc';
const nearbyStoreStock = fromJS([
  {
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
  },
  {
    code: '1234',
    name: 'asdsa',
    latitude: 12311,
    longitude: 123213,
    address: {
      state: 'asd',
      street: 'bae',
      streetNumber: '1',
      zipCode: '213',
      city: 'roma'
    }
  }
]);
const currentStore = fromJS({
  code: '123',
  name: 'current',
  gpsInformation: {
    x: 12311,
    y: 123213
  }
});
const requestFetchNearbyStores = jest.fn();

describe('AvailabilityDialog', () => {
  const shallowWrapper = shallow(
    <AvailabilityMap
      productCode={productCode}
      productName={productName}
      nearbyStoreStock={nearbyStoreStock}
      currentStore={currentStore}
      requestFetchNearbyStores={requestFetchNearbyStores}
    />
  );

  it('should initialize with the right interal state', () => {
    const expectedState = {
      selectedStore: null,
      infoWindowOpen: false,
      zoom: 11,
      radius: 30
    };
    expect(shallowWrapper.state()).toEqual(expectedState);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render a marker for each nearbyStore in radius', () => {
    expect(shallowWrapper.find(Marker)).toHaveLength(2);
  });

  it('should not have rendered InfoWindow', () => {
    expect(shallowWrapper.find(InfoWindow)).toHaveLength(0);
  });

  it('should call requestFetchNearbyStores with the right args after mounting', () => {
    mountWithStore(
      <AvailabilityMap
        productCode={productCode}
        productName={productName}
        nearbyStoreStock={nearbyStoreStock}
        currentStore={currentStore}
        requestFetchNearbyStores={requestFetchNearbyStores}
      />
    );
    expect(requestFetchNearbyStores).toHaveBeenCalledWith(12311,
      123213, 30);
  });
});
