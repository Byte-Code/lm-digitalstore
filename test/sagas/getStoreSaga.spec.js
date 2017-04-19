import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import { callFetchStore } from '../../app/sagas/getStoreSaga';
import { successFetchStore, failureFetchStore } from '../../app/actions/storeActions';
// import { requestFetchProducts } from '../../app/actions/catalogueActions';

const validResponse = {
  content: {
    name: 'foo',
    code: '23',
    gpsInformation: {
      x: 20,
      y: 20
    }
  },
  status: 'OK'
};
const invalidResponse = {
  content: {
    description: 'not found'
  },
  status: 'KO'
};
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

describe('getStoreSaga', () => {
  describe('Scenario1: input is fine, doesn\'t throw', () => {
    const input = { storeCode: '11' };
    const gen = callFetchStore(input);

    // HACK(ish) need to serialize otherwise test doesn't pass, bound functions
    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getStore.bind(apiV1)))
      );
    });

    it('should dispatch a SUCCESS_FETCH_STORE action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).get('content');
      expect(gen.next(validResponse).value)
      .toEqual(put(successFetchStore(transformedResult)));
    });

    // it('should then dispatch a REQUEST_FETCH_PRODUCTS action with the ids', () => {
    //   const productIDList = fromJS(['0', '1', '2']);
    //   expect(gen.next().value)
    //   .toEqual(put(requestFetchProducts(input.categoryCode, productIDList)));
    // });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = { storeCode: '' };
    const gen = callFetchStore(input);

    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getStore.bind(apiV1)))
      );
    });

    it('should dispatch a FAILURE_FETCH_STORE action with the error message', () => {
      expect(gen.throw(genericError).value)
      .toEqual(put(failureFetchStore(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no result found, throws an exception', () => {
    const input = { storeCode: 'FAKESTORE123' };
    const gen = callFetchStore(input);

    it('should call the api first', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(call(apiV1.getStore.bind(apiV1)))
      );
    });

    it('should dispatch a FAILURE_FETCH_STORE action with the error message', () => {
      expect(gen.next(invalidResponse).value)
      .toEqual(put(failureFetchStore(notFoundError)));
    });
  });
});
