import { call, put } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import { callFetchRelatedProducts } from '../../app/sagas/getRelatedProductsSaga';
import { requestFetchProductList } from '../../app/actions/productListActions';
import * as productActions from '../../app/actions/productActions';

const validResponse = {
  content: [
    {
      RelatedProducts: [
        { name: 'name0', products: [0, 1, 2] },
        { name: 'name1', products: [0, 1, 2] }
      ]
    }
  ]
};
const invalidResponse = { status: 'OK' };
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

describe('getRelatedProductsSaga', () => {
  describe('Scenario1: input is fine, doesn\'t throw', () => {
    const input = { productCode: '21847689' };
    const gen = callFetchRelatedProducts(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getRelatedProducts.bind(apiV1), input.productCode))
      );
    });

    it('should dispatch a SUCCESS_FETCH_RELATEDPRODUCTS action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).getIn(['content', 0, 'RelatedProducts']);
      expect(gen.next(validResponse).value)
      .toEqual(
        put(productActions.successFetchRelatedProducts(input.productCode, transformedResult))
      );
    });

    it('should dispatch a REQUEST_FETCH_PRODUCTLIST action with a list containing all products id', () => {
      const productIDList = fromJS(validResponse).getIn(['content', 0, 'RelatedProducts'])
      .reduce((acc, val) => acc.push(val.get('products')), List())
      .flatten()
      .toSet()
      .toList();
      expect(gen.next(validResponse).value)
      .toEqual(put(requestFetchProductList(productIDList)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception then calls Xsell', () => {
    const input = { productCode: '' };
    const gen = callFetchRelatedProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getRelatedProducts.bind(apiV1), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_RELATEDPRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value)
      .toEqual(put(productActions.failureFetchRelatedProducts(genericError)));
    });

    it('should then dispatch a REQUEST_FETCH_XSELLPRODUCTS action', () => {
      expect(gen.next().value)
      .toEqual(put(productActions.requestFetchXSellProducts(input.productCode)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception then calls XSell', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchRelatedProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getRelatedProducts.bind(apiV1), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_RELATEDPRODUCTS action with the error message', () => {
      expect(gen.next(invalidResponse).value)
      .toEqual(put(productActions.failureFetchRelatedProducts(notFoundError)));
    });

    it('should then dispatch a REQUEST_FETCH_XSELLPRODUCTS action', () => {
      expect(gen.next().value)
      .toEqual(put(productActions.requestFetchXSellProducts(input.productCode)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
