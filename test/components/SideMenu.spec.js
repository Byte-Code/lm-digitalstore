import React from 'react';
import { shallow } from 'enzyme';

import SideMenu, { Button } from '../../app/components/SideMenu';

describe('SideMenu', () => {
  const result = shallow(
    <SideMenu />
  );

  it('should initially render closed', () => {
    expect(result.state('open')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('the first button should be initially visible', () => {
    expect(result.find(Button).at(0).prop('isVisible')).toBe(true);
  });

  it('should open once the first button is clicked', () => {
    result.find(Button).at(0).simulate('click');
    expect(result.state('open')).toBe(true);
    expect(result).toMatchSnapshot();
  });

  it('the first button should not be visible now', () => {
    expect(result.find(Button).at(0).prop('isVisible')).toBe(false);
  });

  it('should close again once the second button is clicked', () => {
    result.find(Button).at(1).simulate('click');
    expect(result.state('open')).toBe(false);
    expect(result).toMatchSnapshot();
  });
});
