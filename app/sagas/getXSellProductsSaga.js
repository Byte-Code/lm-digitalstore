import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as realTimeStock from '../actions/realTimeStockAction';
import * as productActions from '../actions/productActions';
import * as analyticsAction from '../actions/analyticsActions';
import { requestFetchProductList } from '../actions/productListActions';
import { getStoreCode } from '../reducers/selectors';

export function* callFetchXSellProducts({ productCode }) {
  try {
    const products = yield call(apiClient.fetchSuggest, productCode);
    const result = fromJS(products).map(p => p.get('code')).take(5);
    if (result.isEmpty()) {
      throw new Error('Not Found Error');
    } else {
      yield put(productActions.successFetchXSellProducts(productCode, result));

      const storeCode = yield select(getStoreCode);
      yield put(realTimeStock.requestRealTimeStock({
        storeCodes: storeCode,
        productCodes: result.toJS().join(','),
        type: 'related'
      }));
      yield put(requestFetchProductList(result));
    }
  } catch (error) {
    yield put(productActions.failureFetchXSellProducts(error));
    yield put(analyticsAction.startAnalyticsProduct());
  }
}

export default function* getXSellProductsSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_XSELLPRODUCTS, callFetchXSellProducts);
}
