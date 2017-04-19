import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiMicro, apiV1 } from '../../mocks/apiMock';
import { callFetchSimilarProducts } from '../../app/sagas/getSimilarProductsSaga';
import * as productActions from '../../app/actions/productActions';

const validResponse = [{ code: '0' }, { code: '2' }, { code: '3' }];
const invalidResponse = [];
const listDisplayResponse = {
  content: {
    itemlist: [0, 1, 2]
  }
};
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

describe('getSimilarProductsSaga', () => {
  describe('Scenario1: input is fine, doesn\'t throw', () => {
    const input = { productCode: '21847689' };
    const gen = callFetchSimilarProducts(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the crossSelling api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should then call the productList api with the ids', () => {
      const ids = fromJS(validResponse).map(i => i.get('code'));
      expect(
        JSON.stringify(gen.next(validResponse).value))
        .toEqual(
          JSON.stringify(
          call(apiV1.getProductListDisplay.bind(apiV1), ids)
        )
      );
    });

    it('should dispatch a SUCCESS_FETCH_PRODUCT action with the transformed result', () => {
      const transformedResult = fromJS(listDisplayResponse).getIn(['content', 'itemlist']);
      expect(gen.next(listDisplayResponse).value)
      .toEqual(
        put(productActions.successFetchSimilarProducts(input.productCode, transformedResult))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = { productCode: '' };
    const gen = callFetchSimilarProducts(input);

    it('should call the crossSelling api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_SIMILARPRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value)
      .toEqual(put(productActions.failureFetchSimilarProducts(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchSimilarProducts(input);

    it('should call the crossSelling api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiMicro.getCrossSellingProducts.bind(apiMicro), input.productCode))
      );
    });

    it('should dispatch a FAILURE_FETCH_SIMILARPRODUCTS action with the error message', () => {
      expect(gen.next(invalidResponse).value)
      .toEqual(put(productActions.failureFetchSimilarProducts(notFoundError)));
    });
  });
});
