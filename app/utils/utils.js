import { Range } from 'immutable';
import world from '../../mocks/world';

export function titleFormatter(text) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function chunkItemList(itemList, chunkSize) {
  return Range(0, itemList.count(), chunkSize).map(chunkStart =>
    itemList.slice(chunkStart, chunkStart + chunkSize)
  );
}

export function formatPrice(price) {
  if (price) {
    return price.toFixed(2).replace('.', ',');
  }
}

export function isValidResponse(response) {
  return response.status === 'OK';
}

export function isValidProductResponse(response) {
  return response.basicInfo.status === 'FOUND' && response.price.status === 'FOUND';
}

// TODO test these functions
export function getStockLabel(stock, stockStatus) {
  if (stock > 0) {
    return stock + (stock === 1 ? ' prodotto disponibile' : ' prodotti disponibili');
  }
  switch (stockStatus) {
    case 'notAvailable':
    case 'none':
      return 'Prodotto non disponibile';
    case 'availableOnOrder':
    case 'on_order':
      return 'Prodotto disponibile su ordinazione';
    case 'onRestock':
    case 'on_restock':
      return 'Prodotto in riassortimento';
    default:
      return 'Prodotto non disponibile';
  }
}

export function getCategoryName(catCode = null) {
  let description = 'No Title';
  if (catCode) {
    world.families.forEach((family) => {
      if (family.categoryCode === catCode) {
        description = family.familyName;
      }
    });
  }
  return description;
}

export function getProductAvailability(productInfo, stock) {
  const labels = {
    4: 'Disponibile in Negozio',
    0: 'Prodotto non disponibile',
    1: 'In riassortimento',
    2: 'Disponibile su ordinazione'

  };
  let label = '';

  if (stock > 0) {
    label = labels['4'];
  } else {
    const vendibility = productInfo.getIn(['price', 'data', 'selling', 'vendibility']);
    label = labels[vendibility];
  }
  return label;
}
