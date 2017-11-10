import { Map, fromJS } from 'immutable';
import { getPromotions, buildPromotionMap, marketingLabel } from '../../app/utils/marketingUtils';

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

describe('buildPromotionMap', () => {
  it('should output topLeft: Novita - topRight: null', () => {
    const promotions = buildPromotionAttrs([marketingLabel.novita]);
    const topLeft = { code: marketingLabel.novita };
    checkPromotionMapExpect({ promotions, topLeft });
  });

  it('should output topLeft: PREZZO_GIU - topRight: null', () => {
    const promotions = buildPromotionAttrs([marketingLabel.prezzoGiu]);
    const topLeft = { code: marketingLabel.prezzoGiu };
    checkPromotionMapExpect({ promotions, topLeft });
  });

  it('should output topLeft: null - topRight: blackFriday', () => {
    const promotions = buildPromotionAttrs([marketingLabel.blackFriday]);
    const topRight = { code: marketingLabel.blackFriday };
    checkPromotionMapExpect({ promotions, topRight });
  });

  it('should output topLeft: null - topRight: null with promotionalCode', () => {
    const promotions = buildPromotionAttrs([marketingLabel.promoWeb]);
    const promotionCode = '2';
    checkPromotionMapExpect({ promotions, promotionCode });
  });

  it('should output topLeft: null - topRight: DESTOCK with promotionalCode', () => {
    const promotions = buildPromotionAttrs([marketingLabel.destock]);
    const topRight = { code: marketingLabel.destock };
    checkPromotionMapExpect({ promotions, topRight });
  });

  it('should output topLeft: null - topRight: DESTOCK with also PREZZO_VINCENTE', () => {
    const promotions = buildPromotionAttrs([marketingLabel.destock, marketingLabel.prezzoVincente]);
    const topRight = { code: marketingLabel.destock };
    checkPromotionMapExpect({ promotions, topRight });
  });

  it('should output ' +
    'topLeft: PREZZO_GIU - topRight: PREZZO_VINCENTE ' +
    'with PREZZO_STOCK and NOVITA', () => {
    const promotions = buildPromotionAttrs([
      marketingLabel.prezzoVincente,
      marketingLabel.prezzoStock,
      marketingLabel.novita,
      marketingLabel.prezzoGiu
    ]);
    const topRight = { code: marketingLabel.prezzoVincente };
    const topLeft = { code: marketingLabel.prezzoGiu };
    checkPromotionMapExpect({ promotions, topRight, topLeft });
  });

  it('should output topLeft: NOVITA - topRight: PREZZO_STOCK with also PREZZO_VINCENTE', () => {
    const promotions = buildPromotionAttrs([marketingLabel.prezzoVincente, marketingLabel.novita]);
    const topRight = { code: marketingLabel.prezzoVincente };
    const topLeft = { code: marketingLabel.novita };
    checkPromotionMapExpect({ promotions, topRight, topLeft });
  });

  it('should output topLeft: NOVITA - topRight: IDEAPIU with also PREZZO_VINCENTE', () => {
    const promotions = buildPromotionAttrs([marketingLabel.ideaPiu, marketingLabel.novita]);
    const topRight = { code: marketingLabel.ideaPiu, value: true };
    const topLeft = { code: marketingLabel.novita };
    checkPromotionMapExpect({ promotions, topRight, topLeft });
  });

  it('should output topLeft: PREZZO_GIU - topRight: BLACK_FRIDAY with all promotions', () => {
    const promotions = buildPromotionAttrs([
      marketingLabel.ideaPiu,
      marketingLabel.novita,
      marketingLabel.prezzoGiu,
      marketingLabel.blackFriday,
      marketingLabel.promoWeb,
      marketingLabel.destock,
      marketingLabel.prezzoVincente,
      marketingLabel.prezzoStock
    ]);
    const topRight = { code: marketingLabel.blackFriday };
    const topLeft = { code: marketingLabel.prezzoGiu };
    checkPromotionMapExpect({ promotions, topRight, topLeft });
  });
});

const buildPromotionAttrs = promotions => {
  const map = {};
  promotions.forEach(promotion => {
    map[promotion] = true;
  });
  return fromJS(map);
};

const checkPromotionMapExpect = ({
  promotions,
  promotionCode = '0',
  topLeft = { code: null },
  topRight = { code: null }
  }) => expect(buildPromotionMap({ promotions, promotionCode }))
  .toEqual(fromJS({ topLeft, topRight })
);
