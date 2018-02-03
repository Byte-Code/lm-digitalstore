import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import { callFetchXSellProducts } from '../../app/sagas/getXSellProductsSaga';
import { requestFetchProductList } from '../../app/actions/productListActions';
import * as productActions from '../../app/actions/productActions';
import * as analyticsAction from '../../app/actions/analyticsActions';
import { getStoreCode } from '../../app/reducers/selectors';
import * as realTimeStock from '../../app/actions/realTimeStockAction';

const validResponse = [{ code: 0 }, { code: 1 }, { code: 2 }];
const invalidResponse = [];
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

describe('getXSellProductsSaga', () => {
  describe("Scenario1: input is fine, doesn't throw", () => {
    const input = { productCode: '21847689' };
    const gen = callFetchXSellProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSuggest, input.productCode));
    });

    it('should dispatch a SUCCESS_FETCH_XSELLPRODUCTS action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).map(p => p.get('code')).take(5);
      expect(gen.next(validResponse).value).toEqual(
        put(productActions.successFetchXSellProducts(input.productCode, transformedResult))
      );
    });

    it('should select the store code', () => {
      expect(gen.next().value).toEqual(select(getStoreCode));
    });

    it('should put a REQUEST_REALTIME_STOCK', () => {
      const storeCode = '7';
      const idList = fromJS(validResponse).map(p => p.get('code')).take(5);
      expect(gen.next(storeCode).value).toEqual(
        put(realTimeStock.requestRealTimeStock({
          storeCodes: storeCode,
          productCodes: idList.toJS().join(','),
          type: 'related'
        }))
      );
    });

    it('should dispatch a REQUEST_FETCH_PRODUCTLIST action with the first five results', () => {
      const idList = fromJS(validResponse).map(p => p.get('code')).take(5);
      expect(gen.next(validResponse).value).toEqual(put(requestFetchProductList(idList)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception then calls Xsell', () => {
    const input = { productCode: '' };
    const gen = callFetchXSellProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSuggest, input.productCode));
    });

    it('should dispatch a FAILURE_FETCH_XSELLPRODUCTS action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(
        put(productActions.failureFetchXSellProducts(genericError))
      );
    });

    it('should dispatch a START_ANALYTICS_PRODUCT', () => {
      expect(gen.next().value).toEqual(
        put(analyticsAction.startAnalyticsProduct())
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception then calls XSell', () => {
    const input = { productCode: 'FAKEPRODUCT123' };
    const gen = callFetchXSellProducts(input);

    it('should call the RelatedProducts api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSuggest, input.productCode));
    });

    it('should dispatch a FAILURE_FETCH_XSELLPRODUCTS action with the error message', () => {
      expect(gen.next(invalidResponse).value).toEqual(
        put(productActions.failureFetchXSellProducts(notFoundError))
      );
    });

    it('should dispatch a START_ANALYTICS_PRODUCT', () => {
      expect(gen.next().value).toEqual(
        put(analyticsAction.startAnalyticsProduct())
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
