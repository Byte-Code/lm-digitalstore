/* eslint-disable */
export function getCurrentPath(state) {
  return state.getIn(['routing', 'locationBeforeTransitions', 'pathname']);
}

export function getRoutingData(state) {
  return state.getIn(['routing', 'locationBeforeTransitions']);
}
/* eslint-disable */
