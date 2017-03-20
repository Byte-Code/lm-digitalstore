import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';

export default function* root() {
  yield [
    fork(getWorldSaga),
    fork(getWeatherSaga)
  ];
}
