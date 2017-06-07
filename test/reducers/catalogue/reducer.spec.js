import { OrderedSet } from 'immutable';

import * as actions from '../../../app/actions/productListActions';
import reducer from '../../../app/reducers/Catalogue/catalogueReducer';

const initialState = OrderedSet();
const anyAction = { type: 'any' };
const result = OrderedSet([1, 2, 3]);

describe('catalogueReducer', () => {
  it('should return the current state in default case', () => {
    expect(reducer(initialState, anyAction)).toEqual(initialState);
  });

  it('should return the result in case of SUCCESS_FETCH_PRODUCTLIST', () => {
    expect(reducer(initialState, actions.successFetchProductList(result))).toEqual(result);
  });

  it('should return initialState in case of CLEAR_PRODUCT_LIST', () => {
    expect(reducer(result, actions.clearProductList())).toEqual(initialState);
  });
});
