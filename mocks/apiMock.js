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

const baseUrl = 'https://api-gw-qa2.leroymerlin.it/api/v1';
const spaceId = 'web-prd';
const apiKey = 'testToken';
const storeCode = 22;
export const apiV1 = new LmApi(baseUrl, spaceId, storeCode, apiKey);

export const apiMicro = new LmApi(baseUrl, spaceId, storeCode, 'W7bWcKx6Vc');
