import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import { callFetchProductList } from '../../app/sagas/getProductListSaga';
import { successFetchProducts, failureFetchProducts } from '../../app/actions/catalogueActions';

const validResponse = {
  content: {
    itemlist: [0, 1, 2]
  }
};
const genericError = new Error('Generic Error');

describe('getProductListSaga', () => {
  describe('Scenario1: input is fine, doesn\'t throw', () => {
    const input = {
      categoryCode: 'CAT4231',
      productIDList: fromJS(['36143366', '33741225', '36135274', '36135260'])
    };
    const gen = callFetchProductList(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getProductListDisplay.bind(apiV1), input.productIDList.toJS()))
      );
    });

    it('should dispatch a SUCCESS_FETCH_PRODUCTS action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).getIn(['content', 'itemlist']);
      expect(gen.next(validResponse).value)
      .toEqual(put(successFetchProducts(input.categoryCode, transformedResult)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = {
      categoryCode: 'CAT4231',
      productIDList: fromJS([])
    };
    const gen = callFetchProductList(input);

    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getProductListDisplay.bind(apiV1), input.productIDList.toJS()))
      );
    });

    it('should dispatch a FAILURE_PRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value)
      .toEqual(put(failureFetchProducts(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
