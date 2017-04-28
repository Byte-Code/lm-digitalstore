import React from 'react';
import { shallow } from 'enzyme';

import Card, { TitleWrapper } from '../../app/components/Card';

describe('Card', () => {
  const TitleComponent = () => (<div>Title</div>);
  const children = <div>Children</div>;
  const result = shallow(
    <Card TitleComponent={TitleComponent}>
      {children}
    </Card>
  );

  it('should initally be closed', () => {
    expect(result.state('expanded')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('should open once the title is clicked', () => {
    result.find(TitleWrapper).simulate('click');
    expect(result.state('expanded')).toBe(true);
    expect(result).toMatchSnapshot();
  });

  it('should close if the title is clickedAgain', () => {
    result.find(TitleWrapper).simulate('click');
    expect(result.state('expanded')).toBe(false);
    expect(result).toMatchSnapshot();
  });
});
