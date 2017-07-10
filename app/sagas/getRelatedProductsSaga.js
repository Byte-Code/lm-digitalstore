import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { requestFetchProductList } from '../actions/productListActions';

export function* callFetchRelatedProducts({ productCode }) {
  try {
    const productList = yield call(apiClient.fetchRelatedProductDisplay, productCode);
    const result = fromJS(productList).getIn(['content', 0, 'RelatedProducts']);
    if (!result) {
      throw new Error('Not Found Error');
    } else {
      yield put(productActions.successFetchRelatedProducts(productCode, result));
      const productIDList = result
        .reduce((acc, val) => acc.push(val.get('products')), List())
        .flatten()
        .toSet()
        .toList();
      yield put(requestFetchProductList(productIDList));
    }
  } catch (error) {
    yield put(productActions.failureFetchRelatedProducts(error));
    yield put(productActions.requestFetchXSellProducts(productCode));
  }
}

export default function* getRelatedProductsSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_RELATEDPRODUCTS, callFetchRelatedProducts);
}
