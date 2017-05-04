import React from 'react';
import { shallow } from 'enzyme';

import Page from '../../app/components/Page';

describe('Page', () => {
  it('should render properly', () => {
    const result = shallow(<Page><p>hello</p></Page>);
    expect(result).toMatchSnapshot();
  });
});
