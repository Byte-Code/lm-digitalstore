import {
  REQUEST_REALTIME_STOCK,
  SECCESS_REALTIME_STOCK,
  FAILURE_REALTIME_STOCK,
  CREAR_REALTIME_STOCK
} from './actionTypes';

export function requestRealTimeStock(data = {}) {
  return ({ type: REQUEST_REALTIME_STOCK, data });
}

export function successFetchRealTimeStock(tipo, result) {
  return ({ type: SECCESS_REALTIME_STOCK, tipo, result });
}

export function failureFetchRealTimeStock() {
  return ({ type: FAILURE_REALTIME_STOCK });
}

export function clearRealTimeStock() {
  return ({ type: CREAR_REALTIME_STOCK });
}
