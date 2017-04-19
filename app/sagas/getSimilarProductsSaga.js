import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1, apiMicro } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';

export function* callFetchSimilarProducts({ productCode }) {
  try {
    const products = yield call(apiMicro.getCrossSellingProducts.bind(apiMicro), productCode);
    const idList = fromJS(products).map(p => p.get('code'));
    if (idList.isEmpty()) {
      throw new Error('Not Found Error');
    } else {
      // TODO move this logic into the producListDetailSaga
      const similarProducts = yield call(apiV1.getProductListDisplay.bind(apiV1), idList.toJS());
      const result = fromJS(similarProducts).getIn(['content', 'itemlist']);
      yield put(productActions.successFetchSimilarProducts(productCode, result));
    }
  } catch (error) {
    yield put(productActions.failureFetchSimilarProducts(error));
  }
}

export default function* getSimilarProductsSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_SIMILARPRODUCTS,
    callFetchSimilarProducts
  );
}
