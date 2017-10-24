import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import * as realTimeStock from '../actions/realTimeStockAction';
import { isValidProductResponse } from '../utils/utils';
import { getNearbyStoresCodes } from '../reducers/selectors';


export function* callFetchProduct({ productCode }) {
  try {
    const product = yield call(
      apiClient.fetchProduct,
      productCode,
      { views: ['basicInfo', 'price', 'kioskStock'].join(',') });
    if (isValidProductResponse(product)) {
      yield put(productActions.successFetchProduct(productCode, fromJS(product)));
      const nearByCodesList = yield select(getNearbyStoresCodes);
      yield put(realTimeStock.requestRealTimeStock({
        storeCodes: nearByCodesList.toJS().join(','),
        productCodes: productCode,
        type: 'main'
      }));
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
