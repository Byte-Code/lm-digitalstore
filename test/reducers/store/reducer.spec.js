import { Map, fromJS } from 'immutable';

import * as actions from '../../../app/actions/storeActions';
import reducer from '../../../app/reducers/Store/storeReducer';

const initialState = Map();
const anyAction = { type: 'any' };
const result = fromJS({ data: 'somedata' });

describe('storeReducer', () => {
  it('should return initialState in default case', () => {
    expect(reducer(initialState, anyAction)).toEqual(initialState);
  });

  it('should return the result in case of SUCCESS_FETCH_STORE', () => {
    expect(reducer(initialState, actions.successFetchStore(result))).toEqual(result);
  });

  it('should set the result under state.nearbyStores in case of SUCCESS_FETCH_NEARBYSTORES', () => {
    const expectedResult = fromJS({ nearbyStores: result });
    expect(reducer(initialState, actions.successFetchNearbyStores(result))).toEqual(expectedResult);
  });
});
