import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import { callFetchNearbyStores } from '../../app/sagas/getNearbyStoresSaga';
import { successFetchNearbyStores, failureFetchNearbyStores } from '../../app/actions/storeActions';

const validResponse = {
  content: ['store1', 'store2', 'store3'],
  status: 'OK'
};
const invalidResponse = {
  status: 'OK'
};
const genericError = new Error('Generic Error');
const notFoundError = new Error('Not Found Error');

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

describe('getNearbyStoresSaga', () => {
  describe("Scenario1: input is fine, doens't throw", () => {
    const input = { lat: 200, lng: 30, range: 20 };
    const pathParams = { lat: 200, lng: 30 };
    const queryParams = { range: 20, orderBy: 'distance' };
    const gen = callFetchNearbyStores(input);

    it('should call the api', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSearchCoords, pathParams, queryParams));
    });

    it('should dispatch a SUCCESS_FETCH_NEARBYSTORES action with the transformed result', () => {
      const transformedResult = fromJS(validResponse).get('content');
      expect(gen.next(validResponse).value).toEqual(
        put(successFetchNearbyStores(transformedResult))
      );
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: input is invalid, throws an exception', () => {
    const input = { lat: 'foo', lng: undefined, range: 20 };
    const pathParams = { lat: 'foo', lng: undefined };
    const queryParams = { range: 20, orderBy: 'distance' };
    const gen = callFetchNearbyStores(input);

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSearchCoords, pathParams, queryParams));
    });

    it('should dispatch a FAILURE_FETCH_NEARBYSTORES action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(put(failureFetchNearbyStores(genericError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario3: no results are found, throw an exception', () => {
    const input = { lat: 200, lng: 30, range: 20 };
    const pathParams = { lat: 200, lng: 30 };
    const queryParams = { range: 20, orderBy: 'distance' };
    const gen = callFetchNearbyStores(input);

    it('should call the api', () => {
      expect(gen.next().value).toEqual(call(apiClient.fetchSearchCoords, pathParams, queryParams));
    });

    it('should dispatch a FAILURE_FETCH_NEARBYSTORES with the error message', () => {
      expect(gen.next(invalidResponse).value).toEqual(put(failureFetchNearbyStores(notFoundError)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });
});
