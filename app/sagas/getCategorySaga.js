import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as categoryActions from '../actions/categoryActions';
import * as catalogueActions from '../actions/catalogueActions';

export function* callFetchCategory(action) {
  try {
    const { categoryCode } = action;
    const categoryList = fromJS(yield call(apiV1.getCategoryDisplay.bind(apiV1), categoryCode)).get('content');
    yield put(categoryActions.successFetchCategory(categoryCode, categoryList));
    // TODO don't fetch all the products, but fetch them in CatalogueSaga
    const orderedProducts = categoryList.get('orderedProducts') || List();
    // HACK problem with LMapi here
    if (!orderedProducts.isEmpty()) {
      const productIDList = orderedProducts.map(p => p.get('code')).toJS();
      const productList = fromJS(yield call(apiV1.getProductListDisplay.bind(apiV1), productIDList)).getIn(['content', 'itemlist']);
      yield put(catalogueActions.successFetchProducts(categoryCode, productList));
    }
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
