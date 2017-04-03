import { put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as catalogueActions from '../actions/catalogueActions';
import { getSellingAids } from '../reducers/selectors';

export function* applyFilters(action) {
  const { categoryCode, aidCodes } = action;
  const aids = yield select(getSellingAids, categoryCode);
  const filteredIdList = aidCodes.map(code => (
    aids.find(a => a.get('code') === code).get('products')
  ));
  yield put(catalogueActions.UPDATE_CATALOGUE, filteredIdList);
}

export default function* filterCatalogueSaga() {
  yield takeEvery(
    actionTypes.FILTER_CATALOGUE,
    applyFilters
  );
}
