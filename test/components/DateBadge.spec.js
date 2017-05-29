import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import DateBadge from '../../app/components/DateBadge';

moment.locale('it');

describe('DateBadge', () => {
  const result = mount(<DateBadge />);

  it('should update state with the intervalID before mounting', () => {
    expect(result.state('intID')).toEqual(0);
  });

  it('should update state with the currentTime everySecond', () => {
    setTimeout(() => {
      const currentTime = moment().format('ddd HH:mm');
      expect(result.state('currentTime')).toEqual(currentTime);
    }, 1000);
  });

  it('should render properly', () => {
    expect(result).toMatchSnapshot();
  });
});
