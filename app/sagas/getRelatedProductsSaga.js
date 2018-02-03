import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as realTimeStock from '../actions/realTimeStockAction';
import * as productActions from '../actions/productActions';
import { requestFetchProductList } from '../actions/productListActions';
import { getStoreCode } from '../reducers/selectors';

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
      const storeCode = yield select(getStoreCode);
      yield put(realTimeStock.requestRealTimeStock({
        storeCodes: storeCode,
        productCodes: productIDList.toJS().join(','),
        type: 'related'
      }));
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
