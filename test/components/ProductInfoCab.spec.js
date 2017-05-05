import React from 'react';
import { shallow } from 'enzyme';
import { Map, Seq, fromJS } from 'immutable';

import ProductInfoCAB, { Title } from '../../app/components/ProductInfoCAB';

const emptyDescriptions = Seq();
const emptyMarketingDescriptions = Map();
const marketingDescriptions = fromJS({
  chooseBlocks: [
    { title: 'desc0',
      customerChooses: [{ description: 'foo' }, { description: 'bar' }]
    },
    { title: 'desc1',
      customerChooses: [{ description: 'foobar' }]
    }
  ]
});
const descriptions = fromJS([
  [{
    code: 'description0',
    title: 'description0',
    description: [
      { label: 'label00', value: 'value00' },
      { label: 'label01', value: 'value01' },
      { label: 'label02', value: 'value02' }
    ]
  },
  {
    code: 'description01',
    title: 'description01',
    description: [
      { label: 'label03', value: 'value03' },
    ]
  },
  ],
  [{
    code: 'description1',
    title: 'description1',
    description: [
      { label: 'label04', value: 'value04' },
      { label: 'label05', value: 'value05' },
      { label: 'label06', value: 'value06' }
    ]
  }],
  [{
    code: 'descriptionNotRendered',
    title: 'descriptionNotRendered',
    description: [
      { label: 'labelNR', value: 'valueNR' }
    ]
  }]
]).toSeq();

describe('ProductInfoCAB', () => {
  it('should render no descriptions when they are not provided', () => {
    const result = shallow(
      <ProductInfoCAB
        descriptions={emptyDescriptions}
        marketingDescriptions={emptyMarketingDescriptions}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a list of marketingDescriptions', () => {
    const result = shallow(
      <ProductInfoCAB
        descriptions={emptyDescriptions}
        marketingDescriptions={marketingDescriptions}
      />
    );
    expect(result.find(Title)).toHaveLength(2);
    expect(result.find('p')).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });

  it('should render a max of two list of descriptions', () => {
    const result = shallow(
      <ProductInfoCAB
        descriptions={descriptions}
        marketingDescriptions={emptyMarketingDescriptions}
      />
    );
    expect(result.find(Title)).toHaveLength(3);
    expect(result.find('p')).toHaveLength(7);
    expect(result).toMatchSnapshot();
  });

  it('should render both descriptions and marketingDescriptions', () => {
    const result = shallow(
      <ProductInfoCAB
        descriptions={descriptions}
        marketingDescriptions={marketingDescriptions}
      />
    );
    expect(result.find(Title)).toHaveLength(5);
    expect(result.find('p')).toHaveLength(10);
    expect(result).toMatchSnapshot();
  });
});
