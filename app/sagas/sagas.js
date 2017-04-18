import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';
import getCategorySaga from './getCategorySaga';
import getProductSaga from './getProductSaga';
import getProductListSaga from './getProductListSaga';
import routingSaga from './routingSaga';
import getStoreSaga from './getStoreSaga';

export default function* root() {
  yield [
    fork(getWorldSaga),
    fork(getWeatherSaga),
    fork(getCategorySaga),
    fork(getProductSaga),
    fork(getProductListSaga),
    fork(routingSaga),
    fork(getStoreSaga),
  ];
}
