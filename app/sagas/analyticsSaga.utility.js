import * as _ from 'lodash';
import { select, call } from 'redux-saga/effects';
import { getWorldName, getRoutingData, getCategoryName } from '../reducers/selectors';

export function* getPageNameData() {
  const worldName = yield select(getWorldName);
  const routingData = yield select(getRoutingData);
  const path = _.trimStart(routingData.get('pathname'), '/');
  const pathArray = _.split(path, '/');
  return { worldName, pathArray };
}

export function* getCategoryData(state) {
  const { pathArray, worldName } = yield call(getPageNameData, state);
  const categoryCode = _.startsWith(pathArray[1], 'CAT') ? pathArray[1] : null;
  const categoryName = categoryCode
    ? yield call(getCategoryName, state, categoryCode)
    : null;
  return { categoryCode, categoryName, worldName, pathArray };
}
