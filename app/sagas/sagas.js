import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';
import getCategoryDisplaySaga from './getCategoryDisplaySaga';

export default function* root() {
  yield [
    fork(getWorldSaga),
    fork(getWeatherSaga),
    fork(getCategoryDisplaySaga)
  ];
}
