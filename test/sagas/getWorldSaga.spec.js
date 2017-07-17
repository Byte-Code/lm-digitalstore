import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { fetchWorld } from '../../mocks/apiMock';
import { callFetchWorld } from '../../app/sagas/getWorldSaga';
import { successFetchWorld, failureFetchWorld } from '../../app/actions/worldActions';

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

const validResponse = {
  data: 'someData'
};
const genericError = new Error('genericError');

describe('getWorldSaga', () => {
  describe('scenario1: response is fine, doesn\'t throw', () => {
    const gen = callFetchWorld();

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(call(fetchWorld));
    });

    it('should dispatch a SUCCESS_FETCH_WORLD action with the result', () => {
      const transformedResult = fromJS(validResponse);
      expect(gen.next(validResponse).value).toEqual(put(successFetchWorld(transformedResult)));
    });

    it('and then nothing', () => {
      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('Scenario2: response is not valid, throws an exception', () => {
    const gen = callFetchWorld();

    it('should call the api first', () => {
      expect(gen.next().value).toEqual(call(fetchWorld));
    });

    it('should dispatch a FAILURE_FETCH_WORLD action with the error message', () => {
      expect(gen.throw(genericError).value).toEqual(put(failureFetchWorld(genericError)));
    });
  });
});
