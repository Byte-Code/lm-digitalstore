import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import SimilarProductsDialog, { Slide } from '../../app/components/SimilarProductsDialog';

const similarProducts = fromJS([
  { code: 'product0' },
  { code: 'product1' },
  { code: 'product2' }
]);
const handleClose = jest.fn();
const selectedProduct = 'product0';

describe('SimilarProductsDialog', () => {
  it('should render null if the dialog is not open', () => {
    const result = shallow(
      <SimilarProductsDialog
        similarProducts={similarProducts}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
        isOpen={false}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should otherwise render a list of similarProducts', () => {
    const result = shallow(
      <SimilarProductsDialog
        similarProducts={similarProducts}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
        isOpen
      />
    );
    expect(result.find(Slide)).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });
});
