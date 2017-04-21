import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productListActions from '../actions/productListActions';

export function* callFetchProductList({ productIDList }) {
  try {
    const productList = yield call(apiV1.getProductListDisplay.bind(apiV1), productIDList.toJS());
    const result = fromJS(productList).getIn(['content', 'itemlist']).toOrderedSet();
    yield put(productListActions.successFetchProductList(result));
  } catch (error) {
    yield put(productListActions.failureFetchProductList(error));
  }
}

export default function* getProductListSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_PRODUCTLIST,
    callFetchProductList
  );
}
