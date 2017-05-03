import React from 'react';
import { shallow } from 'enzyme';

import LinkBack from '../../app/components/LinkBack';

describe('LinkBack', () => {
  it('renders properly', () => {
    const result = shallow(
      <LinkBack>
        <p>children</p>
      </LinkBack>
    );
    expect(result).toMatchSnapshot();
  });
});
