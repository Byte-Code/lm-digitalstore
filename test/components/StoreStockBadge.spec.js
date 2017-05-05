import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import StoreStockBadge from '../../app/components/StoreStockBadge';

const storeName = 'storeName';
const currentStoreStock = fromJS({
  storeStock: 10,
});

// TODO finish here
it('should render properly', () => {
  const result = shallow(
    <StoreStockBadge
      storeName={storeName}
      currentStoreStock={currentStoreStock}
      showStore
    />
  );
  expect(result).toMatchSnapshot();
});
