import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiMicro } from '../../mocks/apiMock';
import { callFetchXSellProducts } from '../../app/sagas/getXSellProductsSaga';
import { requestFetchProductList } from '../../app/actions/productListActions';
import * as productActions from '../../app/actions/productActions';

const validResponse = [
  { code: 0 },
  { code: 1 },
  { code: 2 }
];
const invalidResponse = [];
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

describe('getXSellProductsSaga', () => {
  describe('Scenario1: input is fine, doesn\'t throw', () => {
    const input = { productCode: '21847689' };
    const gen = callFetchXSellProducts(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should dispatch a SUCCESS_FETCH_XSELLPRODUCTS action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).map(p => p.get('code')).take(5);
      expect(gen.next(validResponse).value)
      .toEqual(
        put(productActions.successFetchXSellProducts(input.productCode, transformedResult))
      );
    });

    it('should dispatch a REQUEST_FETCH_PRODUCTLIST action with the first five results', () => {
      const idList = fromJS(validResponse).map(p => p.get('code')).take(5);
      expect(gen.next(validResponse).value)
      .toEqual(put(requestFetchProductList(idList)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception then calls Xsell', () => {
    const input = { productCode: '' };
    const gen = callFetchXSellProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_XSELLPRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value)
      .toEqual(put(productActions.failureFetchXSellProducts(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception then calls XSell', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchXSellProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_XSELLPRODUCTS action with the error message', () => {
      expect(gen.next(invalidResponse).value)
      .toEqual(put(productActions.failureFetchXSellProducts(notFoundError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
