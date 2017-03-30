import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';


export function* callFetchProduct(action) {
  try {
    const { productCode } = action;
    const result = fromJS(yield call(apiV1.getProductDisplay.bind(apiV1), productCode))
      .get('content');
    yield put(productActions.successFetchProduct(productCode, result));
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
