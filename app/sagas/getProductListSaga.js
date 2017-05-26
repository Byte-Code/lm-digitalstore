import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productListActions from '../actions/productListActions';

export function* callFetchProductList({ productIDList }) {
  try {
    const productList = yield call(apiClient.fetchProductListDisplay, productIDList.toJS());
    const result = fromJS(productList).getIn(['content', 'itemlist']).toOrderedSet();
    yield put(productListActions.clearProductList());
    yield put(productListActions.successFetchProductList(result));
  } catch (error) {
    yield put(productListActions.failureFetchProductList(error));
  }
}

export default function* getProductListSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_PRODUCTLIST, callFetchProductList);
}
