import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';

import ProductBadge, { Discount, Available } from '../../app/components/ProductBadge';

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
const discountedPrice = fromJS({
  selling: {
    list: 15,
    gross: 10,
    discount: 5
  }
});
const productInfoDiscounted = productInfo.set('price', discountedPrice);
const productInfoNotAvailable = productInfo.set('storeStock', 0);
const handleClick = jest.fn();
const emptyProductInfo = Map();

describe('ProductBadge', () => {
  it('should return null when productInfo is empty', () => {
    const result = shallow(
      <ProductBadge
        handleClick={handleClick}
        productInfo={emptyProductInfo}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should not display the discount if product is not discounted', () => {
    const result = shallow(
      <ProductBadge
        handleClick={handleClick}
        productInfo={productInfo}
      />
    );
    expect(result.find(Discount)).toHaveLength(0);
    expect(result).toMatchSnapshot();
  });

  it('should display the discount if product is discounted', () => {
    const result = shallow(
      <ProductBadge
        handleClick={handleClick}
        productInfo={productInfoDiscounted}
      />
    );
    expect(result.find(Discount)).toHaveLength(1);
    expect(result).toMatchSnapshot();
  });

  it('should display the available overlay if product is in stock', () => {
    const result = shallow(
      <ProductBadge
        handleClick={handleClick}
        productInfo={productInfoDiscounted}
      />
    );
    expect(result.find(Available)).toHaveLength(1);
    expect(result).toMatchSnapshot();
  });

  it('should not display the available overlay if product is not in stock', () => {
    const result = shallow(
      <ProductBadge
        handleClick={handleClick}
        productInfo={productInfoNotAvailable}
      />
    );
    expect(result.find(Available)).toHaveLength(0);
    expect(result).toMatchSnapshot();
  });
});
