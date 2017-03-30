import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as categoryActions from '../actions/categoryActions';

export function* callFetchCategory(action) {
  try {
    const { categoryCode } = action;
    const categoryList = fromJS(yield call(apiV1.getCategoryDisplay.bind(apiV1), categoryCode));
    const idList = categoryList.getIn(['content', 'orderedProducts']).map(p => p.get('code'));
    const productList = fromJS(yield call(apiV1.getProductListDisplay.bind(apiV1), idList.toJS()));
    const result = categoryList
      .setIn(['content', 'itemList'], productList.getIn(['content', 'itemlist']))
      .get('content');
    yield put(categoryActions.successFetchCategory(categoryCode, result));
  } catch (error) {
    yield put(categoryActions.failureFetchCategory());
  }
}

export default function* getCategorySaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_CATEGORY,
    callFetchCategory
  );
}
