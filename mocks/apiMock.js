import RemoteApi from '@byte-code/lm-remote-api';
import world from './world';
import weather from './weather.json';
import { getApiConfig } from './apiConfigSwitch';
import axios from 'axios';

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
  const httpClient = axios.create();

  httpClient.post(apiConfig.heartBeatServiceUrl, payload)
    .catch((err) => {
      console.log('Error while posting heartbeat ' + err)
    });
}

export const apiClient = new RemoteApi(apiConfig);
