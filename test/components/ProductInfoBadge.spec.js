import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import ProductInfoBadge from '../../app/components/ProductInfoBadge';

const emptyMap = Map();
const emptyList = List();
const string = 'foobar';

describe('ProductInfoBadge', () => {
  it('should render properly', () => {
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
      />
    );
    expect(result).toMatchSnapshot();
  });
});
