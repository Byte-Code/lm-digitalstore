import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import ProductInfoBadge from '../../app/components/ProductInfoBadge';
import AvailabilityButton from '../../app/components/AvailabilityButton';

const emptyMap = Map();
const emptyList = List();
const string = 'foobar';

describe('ProductInfoBadge', () => {
  it('should render properly with AvailabilityButton when hasNearbyStores is true', () => {
    const result = shallow(
      <ProductInfoBadge
        price={emptyMap}
        pricingInfo={emptyMap}
        currentStoreStock={emptyMap}
        allStoreStock={emptyList}
        productName={string}
        productCode={string}
        productSlug={string}
        marketingAttributes={emptyMap}
        loyaltyProgram={emptyMap}
        hasNearbyStores
      />
    );
    expect(result).toMatchSnapshot();
    expect(result.find(AvailabilityButton)).toHaveLength(1);
  });

  it('should render properly without AvailabilityButton when hasNearbyStores is false', () => {
    const result = shallow(
      <ProductInfoBadge
        price={emptyMap}
        pricingInfo={emptyMap}
        currentStoreStock={emptyMap}
        allStoreStock={emptyList}
        productName={string}
        productCode={string}
        productSlug={string}
        marketingAttributes={emptyMap}
        loyaltyProgram={emptyMap}
        hasNearbyStores={false}
      />
    );
    expect(result).toMatchSnapshot();
    expect(result.find(AvailabilityButton)).toHaveLength(0);
  });
});
