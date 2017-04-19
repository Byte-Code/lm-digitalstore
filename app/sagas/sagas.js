import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';
import getCategorySaga from './getCategorySaga';
import getProductSaga from './getProductSaga';
import getSimilarProductsSaga from './getSimilarProductsSaga';
import getStoreStockSaga from './getStoreStockSaga';
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
    fork(getSimilarProductsSaga),
    fork(getStoreStockSaga),
    fork(getProductListSaga),
    fork(getStoreSaga),
    fork(getNearbyStoresSaga),
    fork(routingSaga),
  ];
}
