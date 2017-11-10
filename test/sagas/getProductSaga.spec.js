import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import { callFetchProduct } from '../../app/sagas/getProductSaga';
import * as productActions from '../../app/actions/productActions';
import { getNearbyStoresCodes } from '../../app/reducers/selectors';
import * as realTimeStock from '../../app/actions/realTimeStockAction';

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

const validResponse = {
  basicInfo: {
    status: 'FOUND'
  },
  price: {
    status: 'FOUND'
  }
};
const invalidResponse = {
  basicInfo: {
    status: 'NOT_FOUND'
  },
  price: {
    status: 'FOUND'
  }
};
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');
const views = { views: ['basicInfo', 'price', 'kioskStock'].join(',') };

describe('getProductSaga', () => {
  describe("Scenario1: input is fine, doesn't throw", () => {
    const input = { productCode: '21847689' };
    const gen = callFetchProduct(input);

    it('should call the api first', () => {
      expect(gen.next().value)
        .toEqual(call(apiClient.fetchProduct, input.productCode, views));
    });

    it('should dispatch a SUCCESS_FETCH_PRODUCT action with the transformed result', () => {
      const transformedResult = fromJS(validResponse);
      expect(gen.next(validResponse).value).toEqual(
        put(productActions.successFetchProduct(input.productCode, transformedResult))
      );
    });

    it('should call getNearbyStoresCodes', () => {
      expect(gen.next().value).toEqual(
        select(getNearbyStoresCodes)
      );
    });

    it('should put a REQUEST_REALTIME_STOCK action', () => {
      const nearByCodesList = fromJS(['3432342', '32424234']);
      expect(gen.next(nearByCodesList).value).toEqual(
        put(realTimeStock.requestRealTimeStock({
          storeCodes: nearByCodesList.toJS().join(','),
          productCodes: input.productCode,
          type: 'main'
        }))
      );
    });

    it('should then dispatch a REQUEST_FETCH_RELATEDPRODUCTS action', () => {
      expect(gen.next().value).toEqual(
        put(productActions.requestFetchRelatedProducts(input.productCode))
      );
    });

    it('and dispatch a REQUEST_FETCH_STORESTOCK action', () => {
      expect(gen.next().value).toEqual(
        put(productActions.requestFetchStoreStock(input.productCode))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = { productCode: '' };
    const gen = callFetchProduct(input);

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchProduct, input.productCode, views));
    });

    it('should dispatch a FAILURE_FETCH_PRODUCT action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(
        put(productActions.failureFetchProduct(genericError))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchProduct(input);

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchProduct, input.productCode, views));
    });

    it('should dispatch a FAILURE_FETCH_PRODUCT action with the error message', () => {
      expect(gen.next(invalidResponse).value).toEqual(
        put(productActions.failureFetchProduct(notFoundError))
      );
    });
  });
});
