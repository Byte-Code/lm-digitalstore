import getWorldSelector from './World/worldSelectors';

export default function getWorld(state) {
  return getWorldSelector(state.get('worldReducer'));
}
