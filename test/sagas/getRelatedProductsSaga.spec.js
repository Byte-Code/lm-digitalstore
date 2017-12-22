import { call, put, select } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import { callFetchRelatedProducts } from '../../app/sagas/getRelatedProductsSaga';
import { requestFetchProductList } from '../../app/actions/productListActions';
import * as productActions from '../../app/actions/productActions';
import { getStoreCode } from '../../app/reducers/selectors';
import * as realTimeStock from '../../app/actions/realTimeStockAction';

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

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
  describe("Scenario1: input is fine, doesn't throw", () => {
    const input = { productCode: '21847689' };
    const gen = callFetchRelatedProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(
        call(apiClient.fetchRelatedProductDisplay, input.productCode)
      );
    });

    it('should dispatch a SUCCESS_FETCH_RELATEDPRODUCTS action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).getIn(['content', 0, 'RelatedProducts']);
      expect(gen.next(validResponse).value).toEqual(
        put(productActions.successFetchRelatedProducts(input.productCode, transformedResult))
      );
    });

    it('should select the sore code', () => {
      expect(gen.next().value).toEqual(select(getStoreCode));
    });

    it('should put REQUEST_REAL_TIME_STOCK', () => {
      const storeCode = '7';
      const productIDList = fromJS(validResponse)
        .getIn(['content', 0, 'RelatedProducts'])
        .reduce((acc, val) => acc.push(val.get('products')), List())
        .flatten()
        .toSet()
        .toList();
      expect(gen.next(storeCode).value).toEqual(
        put(realTimeStock.requestRealTimeStock({
          storeCodes: storeCode,
          productCodes: productIDList.toJS().join(','),
          type: 'related'
        }))
      );
    });

    it('should dispatch a REQUEST_FETCH_PRODUCTLIST action with a list containing all products id', () => {
      const productIDList = fromJS(validResponse)
        .getIn(['content', 0, 'RelatedProducts'])
        .reduce((acc, val) => acc.push(val.get('products')), List())
        .flatten()
        .toSet()
        .toList();
      expect(gen.next(validResponse).value).toEqual(put(requestFetchProductList(productIDList)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception then calls Xsell', () => {
    const input = { productCode: '' };
    const gen = callFetchRelatedProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(
        call(apiClient.fetchRelatedProductDisplay, input.productCode)
      );
    });

    it('should dispatch a FAILURE_FETCH_RELATEDPRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(
        put(productActions.failureFetchRelatedProducts(genericError))
      );
    });

    it('should then dispatch a REQUEST_FETCH_XSELLPRODUCTS action', () => {
      expect(gen.next().value).toEqual(
        put(productActions.requestFetchXSellProducts(input.productCode))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception then calls XSell', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchRelatedProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(
        call(apiClient.fetchRelatedProductDisplay, input.productCode)
      );
    });

    it('should dispatch a FAILURE_FETCH_RELATEDPRODUCTS action with the error message', () => {
      expect(gen.next(invalidResponse).value).toEqual(
        put(productActions.failureFetchRelatedProducts(notFoundError))
      );
    });

    it('should then dispatch a REQUEST_FETCH_XSELLPRODUCTS action', () => {
      expect(gen.next().value).toEqual(
        put(productActions.requestFetchXSellProducts(input.productCode))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
