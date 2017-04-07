import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as catalogueActions from '../actions/catalogueActions';

export function* callFetchProducts(action) {
  try {
    const { categoryCode, productIDList } = action;
    const productList = fromJS(yield call(apiV1.getProductListDisplay.bind(apiV1), productIDList.toJS())).getIn(['content', 'itemlist']);
    yield put(catalogueActions.successFetchProducts(categoryCode, productList));
  } catch (error) {
    yield put(catalogueActions.failureFetchProducts());
  }
}

export default function* getProductsSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_PRODUCTS,
    callFetchProducts
  );
}
