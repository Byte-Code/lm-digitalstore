import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import ForecastBadge from '../../app/components/ForecastBadge';

describe('ForecastBadge', () => {
  const dailyForecast = fromJS({
    dt: 'dt',
    temp: {
      min: 0,
      max: 0
    },
    weather: [{ main: 'sunny' }]
  });

  it('should render properly', () => {
    const result = shallow(<ForecastBadge dailyForecast={dailyForecast} />);
    expect(result).toMatchSnapshot();
  });
});
