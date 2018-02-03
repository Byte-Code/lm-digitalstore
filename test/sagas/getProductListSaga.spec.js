import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import { callFetchProductList } from '../../app/sagas/getProductListSaga';
import {
  successFetchProductList,
  failureFetchProductList
} from '../../app/actions/productListActions';
import { getCurrentPath } from '../../app/reducers/Router/routerSelectors';
import { getStoreCode } from '../../app/reducers/selectors';
import * as realTimeStock from '../../app/actions/realTimeStockAction';
import * as analyticsAction from '../../app/actions/analyticsActions';

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

const validResponse = {
  productsList: [0, 1, 2]
};
const genericError = new Error('Generic Error');
const views = ['basicInfo', 'price', 'kioskStock'].join(',');

describe('getProductListSaga', () => {
  describe("Scenario1: input is fine, doesn't throw", () => {
    const input = {
      productIDList: fromJS(['36143366', '33741225', '36135274', '36135260'])
    };
    const gen = callFetchProductList(input);

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(
        call(apiClient.fetchListProduct, {
          productCodes: input.productIDList.toJS().join(','),
          views
        })
      );
    });

    it('should dispatch a SUCCESS_FETCH_PRODUCTLIST action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).get('productsList').toOrderedSet();
      expect(gen.next(validResponse).value).toEqual(
        put(successFetchProductList(transformedResult))
      );
    });

    it('should select currentPath', () => {
      expect(gen.next().value).toEqual(select(getCurrentPath));
    });

    it('should select the store code', () => {
      expect(gen.next('/catalogue/').value).toEqual(select(getStoreCode));
    });

    it('should put REQUEST_REALTIME_STOCK', () => {
      const storeCodes = '7';
      expect(gen.next(storeCodes).value).toEqual(
        put(realTimeStock.requestRealTimeStock({
          storeCodes,
          productCodes: input.productIDList.toJS().join(','),
          type: 'catalogue'
        }))
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

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = {
      productIDList: fromJS([])
    };
    const gen = callFetchProductList(input);

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(
        call(apiClient.fetchListProduct, {
          productCodes: input.productIDList.toJS().join(','),
          views
        })
      );
    });

    it('should dispatch a FAILURE_FETCH_PRODUCTLIST action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(put(failureFetchProductList(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
