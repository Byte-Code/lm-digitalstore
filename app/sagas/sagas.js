import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';
import getWeatherSaga from './getWeatherSaga';
import getCategorySaga from './getCategorySaga';
import getProductSaga from './getProductSaga';
import getRelatedProductsSaga from './getRelatedProductsSaga';
import getXSellProductsSaga from './getXSellProductsSaga';
import getStoreStockSaga from './getStoreStockSaga';
import getProductListSaga from './getProductListSaga';
import getStoreSaga from './getStoreSaga';
import getNearbyStoresSaga from './getNearbyStoresSaga';
import routingSaga from './routingSaga';
import analyticsSaga from './analyticsSaga';
import sessionAnalyticsSaga from './sessionAnalyticsSaga';

export default function* root() {
  yield [
    fork(getWorldSaga),
    fork(getWeatherSaga),
    fork(getCategorySaga),
    fork(getProductSaga),
    fork(getRelatedProductsSaga),
    fork(getXSellProductsSaga),
    fork(getStoreStockSaga),
    fork(getProductListSaga),
    fork(getStoreSaga),
    fork(getNearbyStoresSaga),
    fork(routingSaga),
    fork(analyticsSaga),
    fork(sessionAnalyticsSaga)
  ];
}
