import React from 'react';
import { shallow } from 'enzyme';

import LocationBadge from '../../app/components/LocationBadge';

describe('LocationBadge', () => {
  it('renders properly', () => {
    const result = shallow(
      <LocationBadge
        city="milano"
        country="Italia"
        weather="sunny"
        temp={30}
      />
    );
    expect(result).toMatchSnapshot();
  });
});
