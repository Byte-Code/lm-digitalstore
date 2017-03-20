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
