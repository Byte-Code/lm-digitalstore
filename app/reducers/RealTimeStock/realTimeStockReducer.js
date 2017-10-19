import { List } from 'immutable';
import { SECCESS_REALTIME_STOCK, CREAR_REALTIME_STOCK } from '../../actions/actionTypes';

export default function realTimeStockReducer(state = List(), action) {
  switch (action.type) {
    case SECCESS_REALTIME_STOCK:
      return action.result;
    case CREAR_REALTIME_STOCK:
      return List();
    default:
      return state;
  }
}
