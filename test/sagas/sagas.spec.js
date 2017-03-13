import { call } from 'redux-saga/effects';

import { callFetchWorld } from '../../app/sagas/getWorldSaga';
import fetchWorld from '../../mocks/apiMock';

describe('getWorldSaga ', () => {
  const gen = callFetchWorld();

  it('should call fetchWorld', () => {
    expect(gen.next().value).toEqual(call(fetchWorld));
  });
});
