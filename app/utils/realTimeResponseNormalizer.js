import { Map } from 'immutable';

const getStockObj = (stocks) =>
  stocks.reduce((acc, stock) =>
    acc.set(stock.get('productCode'), stock.get('digitalStock')),
    Map());

export default function normalizeRealTimeData(data) {
  return data.reduce((acc, store) =>
    acc.set(store.get('storeCode'), getStockObj(store.get('stock'))),
    Map()
  );
}
