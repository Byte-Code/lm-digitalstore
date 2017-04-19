import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { isValidResponse } from '../utils/utils';

export function* callFetchProduct({ productCode }) {
  try {
    const product = yield call(apiV1.getProductDisplay.bind(apiV1), productCode);
    if (isValidResponse(product)) {
      const result = fromJS(product).get('content');
      yield put(productActions.successFetchProduct(productCode, result));
      yield put(productActions.requestFetchSimilarProducts(productCode));
    } else {
      throw new Error('Not Found Error');
    }
  } catch (error) {
    yield put(productActions.failureFetchProduct(error));
  }
}

export default function* getProductSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_PRODUCT,
    callFetchProduct
  );
}
