import { Map, List, fromJS } from 'immutable';

export function getPromotions(marketingAttributes, loyaltyProgram) {
  let activeMarketing = Map();
  const marketingAttributeList = marketingAttributes.getIn(['marketingAttributeList']);
  if (marketingAttributeList) {
    activeMarketing = marketingAttributeList.reduce((acc, ma) =>
    (acc.set(ma.get('specialBadgeCode'), true)), Map());
  }
  if (marketingAttributes.get('newOnMarketStartDate')) {
    activeMarketing = activeMarketing.set('NOVITA', true);
  }
  if (loyaltyProgram.get('type') === 'DISCOUNT') {
    activeMarketing = activeMarketing.set('IDEAPIU', loyaltyProgram.get('value'));
  }
  return activeMarketing;
}

export function filterPromotions(activeMarketing) {
  let list = List();
  if (activeMarketing.get('PREZZO_GIU')) {
    list = list.push(fromJS({ code: 'PREZZO_GIU' }));
  } else if (activeMarketing.get('NOVITA')) {
    list = list.push(fromJS({ code: 'NOVITA' }));
  }
  if (activeMarketing.get('PROMO_WEB')) {
    list = list.push(fromJS({ code: 'PROMO_WEB' }));
  } else if (activeMarketing.get('DESTOCK')) {
    list = list.filterNot(f => f.get('code') === 'NOVITA');
    list = list.push(fromJS({ code: 'DESTOCK' }));
  } else if (activeMarketing.get('PREZZO_VINCENTE')) {
    list = list.push(fromJS({ code: 'PREZZO_VINCENTE' }));
  } else if (activeMarketing.get('PREZZO_STOCK')) {
    list = list.push(fromJS({ code: 'PREZZO_STOCK' }));
  } else if (activeMarketing.get('IDEAPIU')) {
    list = list.push(fromJS({ code: 'IDEAPIU', value: activeMarketing.get('IDEAPIU') }));
  }
  return list;
}
