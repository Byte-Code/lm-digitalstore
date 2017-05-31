import React from 'react';
import { shallow } from 'enzyme';
import { Div } from 'glamorous';

import TutorialButton from '../../app/components/TutorialButton';

const children = <button>click me</button>;

describe('TutorialButton', () => {
  it('should initially render with a closed dialog', () => {
    const result = shallow(
      <TutorialButton>
        {children}
      </TutorialButton>
    );
    expect(result.state('open')).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it('should open the dialog once clicked', () => {
    const result = shallow(
      <TutorialButton>
        {children}
      </TutorialButton>
    );
    result.find(Div).simulate('click');
    expect(result.state('open')).toBe(true);
    expect(result).toMatchSnapshot();
  });
});
