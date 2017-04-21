import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { requestFetchProductList } from '../actions/productListActions';

export function* callFetchRelatedProducts({ productCode }) {
  try {
    const productList = yield call(apiV1.getRelatedProducts.bind(apiV1), productCode);
    const result = fromJS(productList).getIn(['content', 0, 'RelatedProducts']);
    if (!result) {
      throw new Error('Not Found Error');
    } else {
      yield put(productActions.successFetchRelatedProducts(productCode, result));
      // HACK doesn't work with immutable list
      yield result.toJS().map(g =>
        put(requestFetchProductList(fromJS(g.products)))
      );
    }
  } catch (error) {
    yield put(productActions.failureFetchRelatedProducts(error));
    yield put(productActions.requestFetchXSellProducts(productCode));
  }
}

export default function* getRelatedProductsSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_RELATEDPRODUCTS,
    callFetchRelatedProducts
  );
}
