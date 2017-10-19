import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import * as realTimeStock from '../actions/realTimeStockAction';
import { isValidProductResponse } from '../utils/utils';
import { getStoreCode } from '../reducers/selectors';


export function* callFetchProduct({ productCode }) {
  try {
    const product = yield call(
      apiClient.fetchProduct,
      productCode,
      { views: ['basicInfo', 'price', 'kioskStock'].join(',') });
    if (isValidProductResponse(product)) {
      yield put(productActions.successFetchProduct(productCode, fromJS(product)));
      const storeCode = yield select(getStoreCode);
      yield put(realTimeStock.requestRealTimeStock({ storeCode, productCodes: productCode }));
      yield put(productActions.requestFetchRelatedProducts(productCode));
      yield put(productActions.requestFetchStoreStock(productCode));
    } else {
      throw new Error('Not Found Error');
    }
  } catch (error) {
    yield put(productActions.failureFetchProduct(error));
  }
}

export default function* getProductSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_PRODUCT, callFetchProduct);
}
