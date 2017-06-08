import { Map, List, fromJS } from 'immutable';
import { getPromotions, filterPromotions } from '../../app/utils/marketingUtils';

const futureDate = '2020-10-14T00:00:00.000Z';

describe('getPromotions', () => {
  it('should return an empty Map if no promotions are found', () => {
    const marketingAttributes = Map();
    const loyaltyProgram = Map();
    const result = Map();
    expect(getPromotions(marketingAttributes, loyaltyProgram)).toEqual(result);
  });

  it('should add a key to the map for every active marketingAttribute and it is in the future', () => {
    const marketingAttributes = fromJS({
      marketingAttributeList: [
        {
          specialBadgeCode: 'PREZZO_GIU',
          specialBadgeCodePeriodEndDate: futureDate
        }
      ]
    });
    const loyaltyProgram = Map();
    const result = fromJS({ PREZZO_GIU: true });
    expect(getPromotions(marketingAttributes, loyaltyProgram)).toEqual(result);
  });

  it('should add a NOVITA key to the map when there a newOnMarketEndDate key and it is in the future', () => {
    const marketingAttributes = fromJS({
      marketingAttributeList: [
        {
          specialBadgeCode: 'PREZZO_GIU',
          specialBadgeCodePeriodEndDate: futureDate
        }
      ],
      newOnMarketEndDate: futureDate
    });
    const loyaltyProgram = Map();
    const result = fromJS({ PREZZO_GIU: true, NOVITA: true });
    expect(getPromotions(marketingAttributes, loyaltyProgram)).toEqual(result);
  });

  it('should check the loyaltyProgram for discount and save its value under the IDEAPIU key and it is in the future', () => {
    const marketingAttributes = fromJS({
      marketingAttributeList: [
        {
          specialBadgeCode: 'PREZZO_GIU',
          specialBadgeCodePeriodEndDate: futureDate
        }
      ],
      newOnMarketEndDate: futureDate
    });
    const loyaltyProgram = fromJS({
      type: 'DISCOUNT',
      value: 10,
      endDate: futureDate
    });
    const result = fromJS({ PREZZO_GIU: true, NOVITA: true, IDEAPIU: 10 });
    expect(getPromotions(marketingAttributes, loyaltyProgram)).toEqual(result);
  });
});

describe('filterPromotions', () => {
  it('should return an empty List if no promotions are active', () => {
    const activeMarketing = Map();
    const result = List();
    expect(filterPromotions(activeMarketing)).toEqual(result);
  });

  it('should ignore NOVITA if PREZZOGIU is active', () => {
    const activeMarketing = fromJS({ PREZZO_GIU: true, NOVITA: true });
    const result = fromJS([{ code: 'PREZZO_GIU' }]);
    expect(filterPromotions(activeMarketing)).toEqual(result);
  });

  it('should ignore NOVITA if DESTOCK is active', () => {
    const activeMarketing = fromJS({ DESTOCK: true, NOVITA: true });
    const result = fromJS([{ code: 'DESTOCK' }]);
    expect(filterPromotions(activeMarketing)).toEqual(result);
  });

  it('should keep track of IDEAPIU value', () => {
    const activeMarketing = fromJS({ PREZZO_GIU: true, NOVITA: true, IDEAPIU: 10 });
    const result = fromJS([{ code: 'PREZZO_GIU' }, { code: 'IDEAPIU', value: 10 }]);
    expect(filterPromotions(activeMarketing)).toEqual(result);
  });

  it('should never have more than 2 elements', () => {
    const activeMarketing = fromJS({
      PREZZO_GIU: true,
      NOVITA: true,
      PROMO_WEB: true,
      PREZZO_VINCENTE: true,
      IDEAPIU: 10
    });
    const result = fromJS([{ code: 'PREZZO_GIU' }, { code: 'PROMO_WEB' }]);
    expect(filterPromotions(activeMarketing)).toEqual(result);
    expect(filterPromotions(activeMarketing).size).toBeLessThanOrEqual(2);
  });
});
