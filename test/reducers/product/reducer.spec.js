import { Map, fromJS } from 'immutable';

import * as actions from '../../../app/actions/productActions';
import reducer from '../../../app/reducers/Product/productReducer';

const initialState = Map();
const anyAction = { type: 'any' };
const productCode = 'PROD123';
const result = fromJS({ data: 'somedata' });

describe('productReducer', () => {
  it('should return the current state in default case', () => {
    expect(reducer(initialState, anyAction)).toEqual(initialState);
  });

  it('should set the result under productCode key in case of SUCCESS_FETCH_PRODUCT', () => {
    const expectedResult = fromJS({
      [productCode]: result
    });
    expect(reducer(initialState, actions.successFetchProduct(productCode, result))).toEqual(
      expectedResult
    );
  });

  it('should set the result under productCode/similarProducts key in case of SUCCESS_FETCH_RELATEDPRODUCTS', () => {
    const expectedResult = fromJS({
      [productCode]: { similarProducts: result }
    });
    expect(reducer(initialState, actions.successFetchRelatedProducts(productCode, result))).toEqual(
      expectedResult
    );
  });

  it('should set the result under productCode/similarProducts array (and hardcoded name + products keys) in case of SUCCESS_FETCH_XSELLPRODUCTS', () => {
    const expectedResult = fromJS({
      [productCode]: { similarProducts: [{ name: 'POTREBBE SERVIRTI ANCHE', products: result }] }
    });
    expect(reducer(initialState, actions.successFetchXSellProducts(productCode, result))).toEqual(
      expectedResult
    );
  });

  it('should set the result under productCode/allStoreStock key in case of SUCCESS_FETCH_STORESTOCK', () => {
    const expectedResult = fromJS({
      [productCode]: { allStoreStock: result }
    });
    expect(reducer(initialState, actions.successFetchStoreStock(productCode, result))).toEqual(
      expectedResult
    );
  });
});
