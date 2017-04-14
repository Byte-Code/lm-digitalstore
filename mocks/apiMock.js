import LmApi from '@byte-code/lm-sdk';
import world from './world';
import weather from './weather.json';

export function fetchWorld() {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(world)
    );
  });
}

export function fetchWeather() {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(weather)
    );
  });
}

const baseUrl = 'https://api.leroymerlin.it/api/v1';
const spaceId = 'web-prd';
const apiKey = 'wYv7iVtxEU';
const storeCode = 7;
export const apiV1 = new LmApi(baseUrl, spaceId, storeCode, apiKey);
export const storeStockApi = new LmApi(baseUrl, spaceId, storeCode, '96zoJArqvUf0');
export const apiMicro = new LmApi('https://api-gw-qa.leroymerlin.it/', spaceId, storeCode, 'W7bWcKx6Vc');
