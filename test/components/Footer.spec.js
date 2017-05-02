import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../app/components/Footer';

describe('Footer', () => {
  it('should render properly', () => {
    const result = shallow(<Footer />);
    expect(result).toMatchSnapshot();
  });
});
