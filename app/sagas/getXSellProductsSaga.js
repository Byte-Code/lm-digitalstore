import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { requestFetchProductList } from '../actions/productListActions';

export function* callFetchXSellProducts({ productCode }) {
  try {
    const products = yield call(apiClient.fetchSuggest, productCode);
    const result = fromJS(products).map(p => p.get('code')).take(5);
    if (result.isEmpty()) {
      throw new Error('Not Found Error');
    } else {
      yield put(productActions.successFetchXSellProducts(productCode, result));
      yield put(requestFetchProductList(result));
    }
  } catch (error) {
    yield put(productActions.failureFetchXSellProducts(error));
  }
}

export default function* getXSellProductsSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_XSELLPRODUCTS, callFetchXSellProducts);
}
