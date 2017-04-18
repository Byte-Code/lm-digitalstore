import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as catalogueActions from '../actions/catalogueActions';

export function* callFetchProductList({ categoryCode, productIDList }) {
  try {
    const productList = yield call(apiV1.getProductListDisplay.bind(apiV1), productIDList.toJS());
    const result = fromJS(productList).getIn(['content', 'itemlist']);
    yield put(catalogueActions.successFetchProducts(categoryCode, result));
  } catch (error) {
    yield put(catalogueActions.failureFetchProducts(error));
  }
}

export default function* getProductListSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_PRODUCTS,
    callFetchProductList
  );
}
