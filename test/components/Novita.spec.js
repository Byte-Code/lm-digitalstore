import React from 'react';
import { shallow } from 'enzyme';

import Novita from '../../app/components/Novita';

describe('Novita', () => {
  it('should render properly', () => {
    const result = shallow(<Novita />);
    expect(result).toMatchSnapshot();
  });
});
