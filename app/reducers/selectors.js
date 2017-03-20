import getWorldSelector from './World/worldSelectors';
import getWeatherSelector from './Weather/weatherSelectors';

export function getWorld(state) {
  return getWorldSelector(state.get('worldReducer'));
}

export function getWeather(state) {
  return getWeatherSelector(state.get('weatherReducer'));
}
