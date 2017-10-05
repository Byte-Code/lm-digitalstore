import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { apiClient } from '../../mocks/apiMock';
import {
  successFetchRealTimeStock,
  failureFetchRealTimeStock
} from '../actions/realTimeStockAction';

import { REQUEST_REALTIME_STOCK } from '../actions/actionTypes';


export function* callFetchRealTimeStock(action) {
  try {
    const { productCodes, storeCode } = action.data;
    const stocks = yield call(
      apiClient.fetchRealTimeStock, storeCode, { productCodes }
    );
    const { productCode, storeStock } = stocks.stock[0];
    const successData = fromJS({ storeCode, productCode, storeStock });
    yield put(successFetchRealTimeStock(successData));
  } catch (error) {
    yield put(failureFetchRealTimeStock(error));
  }
}

export default function* getRealTimeStock() {
  yield takeLatest(REQUEST_REALTIME_STOCK, callFetchRealTimeStock);
}
