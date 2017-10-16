import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productListActions from '../actions/productListActions';
import * as analyticsAction from '../actions/analyticsActions';

export function* callFetchProductList({ productIDList }) {
  try {
    const productList = yield call(apiClient.fetchListProduct, {
      productCodes: productIDList.toJS().join(','),
      views: ['basicInfo', 'price', 'kioskStock'].join(',')
    });
    const result = fromJS(productList).get('productsList').toOrderedSet();
    yield put(productListActions.successFetchProductList(result));
    yield put(analyticsAction.startAnalyticsProduct());
  } catch (error) {
    yield put(productListActions.failureFetchProductList(error));
  }
}

export default function* getProductListSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_PRODUCTLIST, callFetchProductList);
}
