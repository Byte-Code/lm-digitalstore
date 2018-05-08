import { call, takeEvery, select } from 'redux-saga/effects';
import { START_ANALYTICS_SESSION, SUCCESS_FETCH_STORE } from '../actions/actionTypes';
import { isDebugMode, isStageMode } from '../CommandLineOptions';
import { getStore } from '../reducers/selectors';
import getIpAddresses from '../utils/get-ip-addresses';
import getHostName from '../utils/get-hostname';
import appPackage from '../package.json';
import PingIdentityService from '../pingIdentity/PingIdentityService';

export default function* pingIdentitySaga() {
  yield takeEvery([
    START_ANALYTICS_SESSION, SUCCESS_FETCH_STORE
  ], callIdentityService);
}

function* callIdentityService(action) {
  yield call(mapFunctions[action.type]);
}

const mapFunctions = {
  SUCCESS_FETCH_STORE: initializePingIdentity,
  START_ANALYTICS_SESSION: incrementSessionCount
};

const getEnv = () => {
  const env = process.env.NODE_ENV === 'production' && !(isDebugMode || isStageMode)
    ? 'production'
    : 'test';
  return env;
};

function* initializePingIdentity() {
  PingIdentityService.hostName = yield call(getHostName);
  PingIdentityService.ipAddress = yield call(getIpAddresses);
  PingIdentityService.store = yield select(getStore);
  PingIdentityService.processEnvType = yield call(getEnv);
  PingIdentityService.version = appPackage.version;
  yield call(PingIdentityService.startIdentityDaemon);
}

function incrementSessionCount() {
  PingIdentityService.usersSessionCount = PingIdentityService.usersSessionCount += 1;
}

