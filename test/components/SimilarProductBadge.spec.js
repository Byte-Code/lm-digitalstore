import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import SimilarProductBadge from '../../app/components/SimilarProductBadge';

const productInfo = fromJS({
  name: 'name',
  code: 'code',
  slug: 'slug',
  productDetail: {
    descriptionType: 'descriptionType',
    marketingDescriptions: {},
    descriptions: []
  },
  mainImage: 'mainImage',
  marketingAttributes: {},
  price: {
    selling: {
      list: 15,
      gross: 15
    }
  },
  productStockInfo: {
    vendibilityValue: 'none'
  },
  storeStock: 10,
  pricingInformations: {},
  allStoreStock: [],
  images: ['image1'],
  loyaltyProgram: {},
  similarProducts: [
    {
      name: 'anche',
      products: ['prod1', 'prod2']
    }
  ]
});

describe('SimilarProductBadge', () => {
  it('should render properly', () => {
    const result = shallow(<SimilarProductBadge productInfo={productInfo} />);
    expect(result).toMatchSnapshot();
  });
});
