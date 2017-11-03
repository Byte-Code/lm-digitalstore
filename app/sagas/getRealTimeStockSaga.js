import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { apiClient } from '../../mocks/apiMock';
import {
  successFetchRealTimeStock,
  failureFetchRealTimeStock
} from '../actions/realTimeStockAction';
import normalizeRealTimeData from '../utils/realTimeResponseNormalizer';

import { REQUEST_REALTIME_STOCK } from '../actions/actionTypes';


export function* callFetchRealTimeStock(action) {
  try {
    const { productCodes, storeCodes, type } = action.data;
    const stocks = yield call(
      apiClient.fetchRealTimeStock, { storeCodes, productCodes }
    );
    const normalized = yield call(normalizeRealTimeData, fromJS(stocks));
    yield put(successFetchRealTimeStock(type, normalized));
  } catch (error) {
    yield put(failureFetchRealTimeStock(error));
  }
}

export default function* getRealTimeStock() {
  yield takeEvery(REQUEST_REALTIME_STOCK, callFetchRealTimeStock);
}
