import React from 'react';
import { shallow } from 'enzyme';

import ScreenSaver from '../../app/components/ScreenSaver';

describe('ScreenSaver', () => {
  it('should render properly', () => {
    const result = shallow(
      <ScreenSaver />
    );
    expect(result).toMatchSnapshot();
  });
});
