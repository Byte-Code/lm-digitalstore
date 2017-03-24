import LmApi from 'lm-sdk';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';

const baseUrl = 'https://api-gw-qa.leroymerlin.it/api/v1';
const spaceId = 'web-prd';
const apiKey = 'testToken';
const storeCode = 89;
export const api = new LmApi(baseUrl, spaceId, storeCode, apiKey);

export function* callFetchProduct(action) {
  try {
    const { productCode } = action;
    const result = fromJS(yield call(api.getProductDisplay.bind(api), productCode))
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
