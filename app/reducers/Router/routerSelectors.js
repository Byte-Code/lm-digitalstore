/* eslint-disable */
export function getCurrentPath(state) {
  return state.getIn([
    'routing',
    'locationBeforeTransitions',
    'pathname'
  ]);
}
/* eslint-disable */
