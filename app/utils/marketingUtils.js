import { Map } from 'immutable';

export const marketingLabel = {
  prezzoGiu: 'PREZZO_GIU',
  novita: 'NOVITA',
  blackFriday: 'BLACK_FRIDAY',
  promoWeb: 'PROMO_WEB',
  destock: 'DESTOCK',
  prezzoVincente: 'PREZZO_VINCENTE',
  prezzoStock: 'PREZZO_STOCK',
  ideaPiu: 'IDEAPIU'
};

export function isFutureDate(stringDate) {
  return new Date().getTime() < new Date(stringDate).getTime();
}

export function isNewOnMarket(marketingAttributes) {
  return isFutureDate(marketingAttributes.get('newOnMarketEndDate'));
}

export function hasLoyaltyDiscount(loyaltyProgram) {
  return loyaltyProgram.get('type') === 'DISCOUNT' && isFutureDate(loyaltyProgram.get('endDate'));
}

export function getPromotions(marketingAttributes, loyaltyProgram) {
  let activeMarketing = Map();
  const marketingAttributeList = marketingAttributes.get('marketingAttributeList');
  if (marketingAttributeList) {
    activeMarketing = marketingAttributeList.reduce((acc, ma) => {
      let list = acc;
      if (isFutureDate(ma.get('specialBadgeCodePeriodEndDate'))) {
        list = acc.set(ma.get('specialBadgeCode'), true);
      }
      return list;
    }, Map());
  }
  if (isNewOnMarket(marketingAttributes)) {
    activeMarketing = activeMarketing.set('NOVITA', true);
  }
  if (hasLoyaltyDiscount(loyaltyProgram)) {
    activeMarketing = activeMarketing.set('IDEAPIU', loyaltyProgram.get('value'));
  }
  return activeMarketing;
}

const buildMarketingTopLeft = ({ promotions = Map() }) => {
  const hasPrezzoGiu = promotions.has(marketingLabel.prezzoGiu);
  const hasNovita = promotions.has(marketingLabel.novita);
  const hasPrezzoStock = promotions.has(marketingLabel.prezzoStock);
  let promotion = new Map({ code: null });

  if (hasPrezzoGiu) {
    promotion = promotion.set('code', marketingLabel.prezzoGiu);
  } else if (hasNovita && !hasPrezzoStock) {
    promotion = promotion.set('code', marketingLabel.novita);
  }
  return promotion;
};

const buildMarketingTopRight = ({ promotions = Map(), promotionCode = '0' }) => {
  const hasBlackFriday = promotions.has(marketingLabel.blackFriday);
  const hasPromoWeb = promotions.has(marketingLabel.promoWeb);
  const hasDestock = promotions.has(marketingLabel.destock);
  const hasPrezzoVincente = promotions.has(marketingLabel.prezzoVincente);
  const hasPrezzoStock = promotions.has(marketingLabel.prezzoStock);
  const ideaPiu = promotions.get(marketingLabel.ideaPiu);
  const promoCodeToNumber = Number.parseInt(promotionCode);
  let promotion = new Map({ code: null });

  if (hasBlackFriday) {
    promotion = promotion.set('code', marketingLabel.blackFriday);
  } else if (hasPromoWeb && !(promoCodeToNumber === 2)) {
    promotion = promotion.set('code', marketingLabel.promoWeb);
  } else if (hasDestock) {
    promotion = promotion.set('code', marketingLabel.destock);
  } else if (hasPrezzoVincente) {
    promotion = promotion.set('code', marketingLabel.prezzoVincente);
  } else if (hasPrezzoStock) {
    promotion = promotion.set('code', marketingLabel.prezzoStock);
  } else if (ideaPiu) {
    promotion = promotion.set('code', marketingLabel.ideaPiu);
    promotion = promotion.set('value', ideaPiu);
  }
  return promotion;
};

export function buildPromotionMap(attrs) {
  let marketingMap = new Map();

  marketingMap = marketingMap.set('topLeft', buildMarketingTopLeft(attrs));
  marketingMap = marketingMap.set('topRight', buildMarketingTopRight(attrs));
  return marketingMap;
}

export function getMarketingProps(product) {
  const marketingAttributes = product.getIn(['basicInfo', 'data', 'marketingAttributes']);
  const loyaltyProgram = product.getIn(['basicInfo', 'data', 'loyaltyProgram']);
  const promotionCode = product.getIn(['price', 'data', 'selling', 'promotion']);
  return { marketingAttributes, loyaltyProgram, promotionCode };
}
