import RemoteApi from '@byte-code/lm-remote-api';

import world from './world';
import weather from './weather.json';
import { getApiConfig } from './apiConfigSwitch';

const { apiConfig } = getApiConfig();

export function fetchWorld() {
  return new Promise(resolve => {
    process.nextTick(() => resolve(world));
  });
}

export function fetchWeather() {
  return new Promise(resolve => {
    process.nextTick(() => resolve(weather));
  });
}

export function postHeartbeat(payload) {
  console.log(payload);
}

export const apiClient = new RemoteApi(apiConfig);
