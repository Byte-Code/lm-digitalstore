import React from 'react';
import { fromJS, Map } from 'immutable';
import { mount } from 'enzyme';

import MarketingFlag from '../../app/components/MarketingFlag';

describe('MarketingFlag', () => {
  it('should render properly when promotions are active', () => {
    const marketingAttributes = fromJS({
      specialBadgeCode: 'PREZZO_STOCK',
      specialBadgeCodePeriodEndDate: '2020-10-14T00:00:00.000Z'
    });
    const loyaltyProgram = fromJS({
      type: 'DISCOUNT',
      value: 10,
      endDate: '2020-10-14T00:00:00.000Z'
    });
    const result = mount(
      <MarketingFlag marketingAttributes={marketingAttributes} loyaltyProgram={loyaltyProgram} />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render an empty div when no promotions are active', () => {
    const marketingAttributes = Map();
    const loyaltyProgram = Map();
    const result = mount(
      <MarketingFlag marketingAttributes={marketingAttributes} loyaltyProgram={loyaltyProgram} />
    );
    expect(result).toMatchSnapshot();
  });
});
