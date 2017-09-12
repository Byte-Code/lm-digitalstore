import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import AvailabilityMap from '../../app/components/AvailabilityMap';
import Marker from '../../app/components/Marker';
import InfoWindow from '../../app/components/InfoWindow';

// TODO find a way to test user interactions
const productCode = '123';
const productName = 'abc';
const allNearbyStores = fromJS([
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
const homeStore = fromJS({
  code: '123',
  name: 'current',
  gpsInformation: {
    x: 12311,
    y: 123213
  }
});
const requestFetchNearbyStores = jest.fn();

describe('AvailabilityMap', () => {
  const shallowWrapper = shallow(
    <AvailabilityMap
      productCode={productCode}
      productName={productName}
      allNearbyStores={allNearbyStores}
      homeStore={homeStore}
      requestFetchNearbyStores={requestFetchNearbyStores}
      nearbyStoresWithProductInStock={allNearbyStores}
      selectedStore=""
      radius={25}
      zoom={11}
      infoWindowOpen={false}
      selectStore={() => {}}
      handleChange={() => {}}
      handleSlide={() => {}}
      closeInfoWindow={() => {}}
    />
  );

  it('should initialize with the right interal state', () => {
    const expectedState = {
      minRadius: 2,
      maxRadius: 50,
      sliderWidth: 960
    };
    expect(shallowWrapper.state()).toEqual(expectedState);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render a marker for each nearbyStore in range', () => {
    expect(shallowWrapper.find(Marker)).toHaveLength(2);
  });

  it('should not have rendered InfoWindow', () => {
    expect(shallowWrapper.find(InfoWindow)).toHaveLength(0);
  });
});
