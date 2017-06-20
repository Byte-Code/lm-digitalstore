import RemoteApi from 'lm-remote-api';
import world from './world';
import weather from './weather.json';

const { apiConfig } = process.env.config;

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

export const apiClient = new RemoteApi(apiConfig);
