import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1, apiMicro } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as storeActions from '../actions/storeActions';
import { isValidResponse } from '../utils/utils';

export function* callFetchStore({ storeCode }) {
  try {
    // HACK init api instances
    apiV1.storeCode = storeCode;
    apiMicro.storeCode = storeCode;
    const storeInfo = yield call(apiV1.getStore.bind(apiV1));
    if (isValidResponse(storeInfo)) {
      const result = fromJS(storeInfo).get('content');
      yield put(storeActions.successFetchStore(result));
    } else {
      throw new Error('Not Found Error');
    }
    // const lat = storeInfo.getIn(['gpsInformation', 'x']);
    // const lng = storeInfo.getIn(['gpsInformation', 'y']);
    // const nearbyStores = fromJS(
    //   yield call(apiV1.getNearbyStores.bind(apiV1), lat, lng)
    // ).get('content');
    // const result = storeInfo.set('nearbyStores', nearbyStores);
  } catch (error) {
    yield put(storeActions.failureFetchStore(error));
  }
}

export default function* getStoreSaga() {
  yield takeEvery(actionTypes.SET_STORE_CODE, callFetchStore);
}
