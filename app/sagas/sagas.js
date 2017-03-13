import { fork } from 'redux-saga/effects';

import getWorldSaga from './getWorldSaga';

export default function* root() {
  yield [
    fork(getWorldSaga)
  ];
}
