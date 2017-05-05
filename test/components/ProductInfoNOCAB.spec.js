import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';

import ProductInfoNOCAB from '../../app/components/ProductInfoNOCAB';

const emptyDescriptions = List();
const descriptions = fromJS([
  [
    { label: 'label00', value: 'value00' },
    { label: 'label01', value: 'value01' },
    { label: 'label02', value: 'value02' }
  ],
  [
    { label: 'labelNR', value: 'valueNR' }
  ]
]);

describe('ProductInfoCAB', () => {
  it('should render no descriptions when they are not provided', () => {
    const result = shallow(
      <ProductInfoNOCAB
        descriptions={emptyDescriptions}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render just one list of descriptions', () => {
    const result = shallow(
      <ProductInfoNOCAB
        descriptions={descriptions}
      />
    );
    expect(result.find('p')).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });
});
