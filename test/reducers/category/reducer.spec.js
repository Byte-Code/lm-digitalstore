import { Map, fromJS } from 'immutable';

import * as actions from '../../../app/actions/categoryActions';
import reducer from '../../../app/reducers/Category/categoryReducer';

const initialState = Map();
const anyAction = { type: 'any' };
const categoryCode = 'CAT123';
const result = fromJS({ data: 'somedata' });

describe('categoryReducer', () => {
  it('should return the current state in default case', () => {
    expect(reducer(initialState, anyAction)).toEqual(initialState);
  });

  it('should set the result under categoryCode key in case of SUCCESS_FETCH_CATEGORY', () => {
    const expectedResult = fromJS({
      [categoryCode]: result
    });
    expect(reducer(initialState, actions.successFetchCategory(categoryCode, result))).toEqual(
      expectedResult
    );
  });
});
