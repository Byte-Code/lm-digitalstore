import { Map } from 'immutable';

export default function main(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_WORLD':
      return action.result;
    default:
      return state;
  }
}
