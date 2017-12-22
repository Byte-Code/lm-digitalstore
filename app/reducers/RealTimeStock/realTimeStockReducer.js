import { Map } from 'immutable';
import { SECCESS_REALTIME_STOCK, CREAR_REALTIME_STOCK } from '../../actions/actionTypes';

export default function realTimeStockReducer(state = Map(), action) {
  switch (action.type) {
    case SECCESS_REALTIME_STOCK:
      return state.set(action.tipo, action.result);
    case CREAR_REALTIME_STOCK:
      return Map();
    default:
      return state;
  }
}
