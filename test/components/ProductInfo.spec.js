import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';

import { chunkItemList } from '../../app/utils/utils';
import ProductInfo from '../../app/components/ProductInfo';
import ProductInfoCAB from '../../app/components/ProductInfoCAB';
import ProductInfoNOCAB from '../../app/components/ProductInfoNOCAB';

const typeCAB = 'CAB';
const typeNOCAB = 'foo';
const descriptions = fromJS(['descriptions0', 'descriptions1', 'descriptions2']);
const marketingDescriptions = Map();

describe('ProductInfo', () => {
  it('should render ProductInfoNOCAB with the right props if product is NOCAB', () => {
    const result = shallow(
      <ProductInfo
        productType={typeNOCAB}
        descriptions={descriptions}
        marketingDescriptions={marketingDescriptions}
      />
    );
    const nextProps = { descriptions };
    expect(result.find(ProductInfoCAB)).toHaveLength(0);
    expect(result.find(ProductInfoNOCAB)).toHaveLength(1);
    expect(result.find(ProductInfoNOCAB).props()).toEqual(
      nextProps
    );
    expect(result).toMatchSnapshot();
  });

  it('should render ProductInfoCAB with the right props if product is CAB', () => {
    const result = shallow(
      <ProductInfo
        productType={typeCAB}
        descriptions={descriptions}
        marketingDescriptions={marketingDescriptions}
      />
    );
    const halfDescriptionsSize = Math.ceil(descriptions.size / 2);
    const chunkedDescriptions = chunkItemList(descriptions, halfDescriptionsSize);
    const nextProps = { descriptions: chunkedDescriptions, marketingDescriptions };
    expect(result.find(ProductInfoNOCAB)).toHaveLength(0);
    expect(result.find(ProductInfoCAB)).toHaveLength(1);
    expect(result.find(ProductInfoCAB).props()).toEqual(
      nextProps
    );
    expect(result).toMatchSnapshot();
  });
});
