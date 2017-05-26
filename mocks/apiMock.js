import RemoteApi from 'lm-remote-api';
import world from './world';
import weather from './weather.json';

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
const apiConfig = {
  prod: {
    baseUrlCore: 'https://api.leroymerlin.it/api/v1',
    baseUrlMS: 'https://api.leroymerlin.it',
    spaceId: 'web-prd',
    storeCode: 7,
    apiKeyCore: 'wYv7iVtxEU',
    apiKeyMS: '96zoJArqvUf0'
  }
};

export const apiClient = new RemoteApi(apiConfig.prod);
