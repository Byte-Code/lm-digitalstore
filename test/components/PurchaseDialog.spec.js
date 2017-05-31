import React from 'react';
import { shallow } from 'enzyme';
import { Div } from 'glamorous';

import PurchaseDialog from '../../app/components/PurchaseDialog';

const productCode = 'PROD123';
const productSlug = 'SLUG123';

describe('PurchaseDialog', () => {
  const result = shallow(
    <PurchaseDialog
      productCode={productCode}
      productSlug={productSlug}
    >
      <p>children</p>
    </PurchaseDialog>
  );

  it('should initially render with a closed dialog', () => {
    expect(result.state('open')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('should open the dialog once clicked', () => {
    result.find(Div).simulate('click');
    expect(result.state('open')).toBe(true);
    expect(result).toMatchSnapshot();
  });
});
