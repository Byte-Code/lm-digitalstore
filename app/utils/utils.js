import { Range } from 'immutable';

export function titleFormatter(text) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function chunkItemList(itemList, chunkSize) {
  return Range(0, itemList.count(), chunkSize)
    .map(chunkStart => itemList.slice(chunkStart, chunkStart + chunkSize));
}

export function formatPrice(price) {
  if (price) {
    return price.toFixed(2).replace('.', ',');
  }
}

export function isValidResponse(response) {
  return response.status === 'OK';
}

// TODO test these functions
export function getStockLabel(stock, stockStatus) {
  if (stock > 0) {
    return stock + (stock === 1 ? ' prodotto disponibile' : ' prodotti disponibili');
  }
  switch (stockStatus) {
    case 'notAvailable':
      return 'Prodotto non disponibile';
    case 'availableOnOrder':
      return 'Prodotto disponibile su ordinazione';
    case 'onRestock':
    default:
      return 'Prodotto disponibile su ordinazione';
  }
}
