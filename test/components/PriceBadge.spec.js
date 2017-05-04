import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import PriceBadge, { Discount } from '../../app/components/PriceBadge';

describe('PriceBadge', () => {
  it('should only render the price if no discount is active', () => {
    const price = fromJS({
      gross: 10
    });
    const pricingInfo = fromJS({
      sellingCapacity: 'unit',
      sellingUnit: 'unit'
    });
    const result = shallow(
      <PriceBadge
        price={price}
        pricingInfo={pricingInfo}
      />
    );
    const discount = result.find(Discount);
    expect(result).toMatchSnapshot();
    expect(discount).toHaveLength(0);
  });

  it('should also render the discount when it is active', () => {
    const price = fromJS({
      list: 15,
      gross: 10,
      discount: 5
    });
    const pricingInfo = fromJS({
      sellingCapacity: 'unit',
      sellingUnit: 'unit'
    });
    const result = shallow(
      <PriceBadge
        price={price}
        pricingInfo={pricingInfo}
      />
    );
    const discount = result.find(Discount);
    expect(result).toMatchSnapshot();
    expect(discount).toHaveLength(1);
  });
});
