import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as catalogueActions from '../actions/catalogueActions';

export function* applyAids(action) {
  const { aidCodes, aids } = action;
  const filteredIdList = aidCodes.map(code => (
    aids.find(a => a.get('code') === code).get('products')
  )).flatten();
  yield put(catalogueActions.updateCatalogue(filteredIdList));
}

export default function* filterCatalogueSaga() {
  yield takeEvery(
    actionTypes.FILTER_CATALOGUE_BY_AIDS,
    applyAids
  );
}
