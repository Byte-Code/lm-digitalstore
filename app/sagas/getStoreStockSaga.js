import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';

export function* callFetchStoreStock({ productCode }) {
  try {
    const storeStock = yield call(apiClient.fetchAllStoreStock, productCode);
    const result = fromJS(storeStock);
    yield put(productActions.successFetchStoreStock(productCode, result));
  } catch (error) {
    yield put(productActions.failureFetchStoreStock(error));
  }
}

export default function* getStoreStockSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_STORESTOCK, callFetchStoreStock);
}
