import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';
import getCategorySaga from './getCategorySaga';
import getProductSaga from './getProductSaga';
import getProductListSaga from './getProductListSaga';
import getStoreSaga from './getStoreSaga';
import getNearbyStoresSaga from './getNearbyStoresSaga';
import routingSaga from './routingSaga';

export default function* root() {
  yield [
    fork(getWorldSaga),
    fork(getWeatherSaga),
    fork(getCategorySaga),
    fork(getProductSaga),
    fork(getProductListSaga),
    fork(getStoreSaga),
    fork(getNearbyStoresSaga),
    fork(routingSaga),
  ];
}
