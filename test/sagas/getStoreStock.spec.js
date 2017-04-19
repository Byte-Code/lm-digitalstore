import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { storeStockApi } from '../../mocks/apiMock';
import { callFetchStoreStock } from '../../app/sagas/getStoreStockSaga';
import * as productActions from '../../app/actions/productActions';

const validResponse = {
  data: 'someData'
};
const genericError = new Error('genericError');

describe('getStoreStockSaga', () => {
  describe('scenario1: response is fine, doesn\'t throw', () => {
    const input = { productCode: '123456' };
    const gen = callFetchStoreStock(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(
          call(storeStockApi.getStoreAvailability.bind(storeStockApi), input.productCode))
      );
    });

    it('should dispatch a SUCCESS_FETCH_STORESTOCK action with the result', () => {
      const transformedResult = fromJS(validResponse);
      expect(gen.next(validResponse).value).toEqual(
        put(productActions.successFetchStoreStock(input.productCode, transformedResult)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: response is not valid, throws an exception', () => {
    const input = { productCode: '' };
    const gen = callFetchStoreStock(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(
          call(storeStockApi.getStoreAvailability.bind(storeStockApi), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_STORESTOCK action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(
        put(productActions.failureFetchStoreStock(genericError)));
    });
  });
});
