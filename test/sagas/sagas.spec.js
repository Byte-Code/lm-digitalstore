import { call } from 'redux-saga/effects';

import { callFetchWorld } from '../../app/sagas/getWorldSaga';
import { callFetchWeather } from '../../app/sagas/getWeatherSaga';
import { fetchWorld, fetchWeather } from '../../mocks/apiMock';

describe('getWorldSaga ', () => {
  const gen = callFetchWorld();

  it('should call fetchWorld', () => {
    expect(gen.next().value).toEqual(call(fetchWorld));
  });
});

describe('getWeatherSaga', () => {
  const gen = callFetchWeather();

  it('should call fetchWeather', () => {
    expect(gen.next().value).toEqual(call(fetchWeather));
  });
});