import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map, fromJS } from 'immutable';

import SplashScreen from '../../app/components/SplashScreen';

const emptyForecast = Map();
const forecast = fromJS({ key: 'exists' });
const requestFetchWeather = jest.fn();

describe('SplashScreen', () => {
  it('should return null when forecast is empty', () => {
    const result = shallow(
      <SplashScreen
        forecast={emptyForecast}
        requestFetchWeather={requestFetchWeather}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should otherwise render properly', () => {
    const result = shallow(
      <SplashScreen
        forecast={forecast}
        requestFetchWeather={requestFetchWeather}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchWeather after mounting', () => {
    mount(
      <SplashScreen
        forecast={forecast}
        requestFetchWeather={requestFetchWeather}
      />
    );
    expect(requestFetchWeather).toHaveBeenCalled();
  });
});
