import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';

import SimilarProducts from '../../app/components/SimilarProducts';
import ProductBadge from '../../app/components/ProductBadge';

const emptySimilarProducts = List();
const similarProducts = fromJS([
  { code: 'product0' },
  { code: 'product1' },
  { code: 'product2' }
]);
const title = 'title';

describe('SimilarProducts', () => {
  it('should render null when similarProducts are empty', () => {
    const result = shallow(
      <SimilarProducts
        similarProducts={emptySimilarProducts}
        title={title}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should otherwise render a list of similarProducts', () => {
    const result = shallow(
      <SimilarProducts
        similarProducts={similarProducts}
        title={title}
      />
    );
    expect(result.find(ProductBadge)).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });

  it('should have an inital state with dialog closed', () => {
    const result = shallow(
      <SimilarProducts
        similarProducts={similarProducts}
        title={title}
      />
    );
    const expectedState = {
      dialogOpen: false,
      selectedProduct: ''
    };
    expect(result.state()).toEqual(expectedState);
    expect(result).toMatchSnapshot();
  });
});
