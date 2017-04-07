import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as categoryActions from '../actions/categoryActions';
import * as catalogueActions from '../actions/catalogueActions';
import { filterProducts, filterProductsByAid } from '../utils/utils';

export function* callFetchCategory(action) {
  try {
    const { categoryCode, activeAid, activeFilters } = action;
    const categoryList = fromJS(yield call(apiV1.getCategoryDisplay.bind(apiV1), categoryCode)).get('content');
    yield put(categoryActions.successFetchCategory(categoryCode, categoryList));
    const sellingAids = categoryList.getIn(['sellingAidsProducts', 0]);
    const filterGroups = categoryList.get('facetFilters').filterNot(g => g.get('group') === 'Prezzo');
    const allAid = filterProductsByAid(sellingAids, activeAid);
    const allFilters = filterProducts(filterGroups, activeFilters);
    yield put(catalogueActions.setFilters(categoryCode, allFilters));
    yield put(catalogueActions.setSellingAids(categoryCode, allAid));
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
