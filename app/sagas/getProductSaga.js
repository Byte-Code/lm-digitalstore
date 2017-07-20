import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { isValidResponse } from '../utils/utils';


export function* callFetchProduct({ productCode }) {
  try {
    const product = yield call(apiClient.fetchProductDisplay, productCode);
    if (isValidResponse(product)) {
      const result = fromJS(product).get('content');
      yield put(productActions.successFetchProduct(productCode, result));
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
