import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import { successFetchCategory, failureFetchCategory } from '../actions/categoryActions';
import { requestFetchProductList } from '../actions/productListActions';
import { isValidResponse } from '../utils/utils';

export function* callFetchCategory({ categoryCode }) {
  try {
    const categoryList = yield call(apiV1.getCategoryDisplay.bind(apiV1), categoryCode);
    if (isValidResponse(categoryList)) {
      const content = fromJS(categoryList).get('content');
      const orderedProducts = content.get('orderedProducts');
      const productIDList = orderedProducts.map(p => p.get('code'));
      const result = content.set('orderedProducts', productIDList);
      yield put(successFetchCategory(categoryCode, result));
      yield put(requestFetchProductList(productIDList));
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
