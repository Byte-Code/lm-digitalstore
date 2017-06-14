import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List, Map } from 'immutable';

import mountWithStore from '../../app/utils/testingUtils';
import Product from '../../app/components/Product';
import SimilarProducts from '../../app/components/SimilarProducts';

const store = fromJS({
  storeReducer: {
    name: 'store'
  }
});

const params = { productCode: 'PRODUCT123' };
const requestFetchProduct = jest.fn();
const storeCode = '89';
const emptyProductInfo = Map();
const emptySimilarProducts = List();
const productInfo = fromJS({
  name: 'name',
  code: 'code',
  slug: 'slug',
  productDetail: {
    descriptionType: 'descriptionType',
    marketingDescriptions: {},
    descriptions: []
  },
  marketingAttributes: {},
  price: { selling: {} },
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
const similarProducts = fromJS([{ code: 'prod1' }, { code: 'prod3' }]);

describe('Product', () => {
  it('should return null when productInfo is empty', () => {
    const result = shallow(
      <Product
        productInfo={emptyProductInfo}
        params={params}
        hasNearbyStores
        storeCode={storeCode}
        similarProducts={emptySimilarProducts}
        requestFetchProduct={requestFetchProduct}
        clearProductList={() => {}}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly with no similarProducts ', () => {
    const result = shallow(
      <Product
        productInfo={productInfo}
        params={params}
        hasNearbyStores
        storeCode={storeCode}
        similarProducts={emptySimilarProducts}
        requestFetchProduct={requestFetchProduct}
        clearProductList={() => {}}
      />
    );
    expect(result.find(SimilarProducts)).toHaveLength(0);
    expect(result).toMatchSnapshot();
  });

  it('should render properly with similarProducts ', () => {
    const result = shallow(
      <Product
        productInfo={productInfo}
        params={params}
        hasNearbyStores
        storeCode={storeCode}
        similarProducts={similarProducts}
        requestFetchProduct={requestFetchProduct}
        clearProductList={() => {}}
      />
    );
    expect(result.find(SimilarProducts)).toHaveLength(1);
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchProduct after mounting', () => {
    mountWithStore(
      <Product
        productInfo={productInfo}
        params={params}
        hasNearbyStores
        storeCode={storeCode}
        similarProducts={emptySimilarProducts}
        requestFetchProduct={requestFetchProduct}
        clearProductList={() => {}}
      />,
      store
    );
    expect(requestFetchProduct).toHaveBeenCalledWith(params.productCode);
  });

  it('should call requestFetchProduct again when productCodeChanges', () => {
    const result = mountWithStore(
      <Product
        productInfo={productInfo}
        params={params}
        hasNearbyStores
        storeCode={storeCode}
        similarProducts={emptySimilarProducts}
        requestFetchProduct={requestFetchProduct}
        clearProductList={() => {}}
      />,
      store
    );
    result.setProps({ params: { productCode: 'PRODUCT456' } });
    expect(requestFetchProduct).toHaveBeenCalledWith('PRODUCT456');
  });
});
