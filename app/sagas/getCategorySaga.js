import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import { successFetchCategory, failureFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts } from '../actions/catalogueActions';

export function* callFetchCategory({ categoryCode }) {
  try {
    const categoryList = yield call(apiV1.getCategoryDisplay.bind(apiV1), categoryCode);
    const result = fromJS(categoryList).get('content');
    const orderedProducts = result.get('orderedProducts');
    if (orderedProducts) {
      yield put(successFetchCategory(categoryCode, result));
      const productIDList = orderedProducts.map(p => p.get('code'));
      yield put(requestFetchProducts(categoryCode, productIDList));
    } else {
      throw new Error('Not Found Error');
    }
  } catch (error) {
    yield put(failureFetchCategory(error));
  }
}

export default function* getCategorySaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_CATEGORY,
    callFetchCategory
  );
}
