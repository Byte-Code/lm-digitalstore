import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productListActions from '../actions/productListActions';
import * as analyticsAction from '../actions/analyticsActions';
import * as realTimeStock from '../actions/realTimeStockAction';
import { getCurrentPath } from '../reducers/Router/routerSelectors';
import { getStoreCode } from '../reducers/selectors';

export function* callFetchProductList({ productIDList }) {
  try {
    const productList = yield call(apiClient.fetchListProduct, {
      productCodes: productIDList.toJS().join(','),
      views: ['basicInfo', 'price', 'kioskStock'].join(',')
    });
    const result = fromJS(productList).get('productsList').toOrderedSet();
    yield put(productListActions.successFetchProductList(result));
    const currentPath = yield select(getCurrentPath);

    if (currentPath.startsWith('/catalogue/')) {
      yield put(realTimeStock.requestRealTimeStock({
        storeCodes: yield select(getStoreCode),
        productCodes: productIDList.toJS().join(','),
        type: 'catalogue'
      }));
    }
    yield put(analyticsAction.startAnalyticsProduct());
  } catch (error) {
    yield put(productListActions.failureFetchProductList(error));
  }
}

export default function* getProductListSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_PRODUCTLIST, callFetchProductList);
}
