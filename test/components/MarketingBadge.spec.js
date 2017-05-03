import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

import MarketingBadge, * as badges from '../../app/components/MarketingBadge';
import Novita from '../../app/components/Novita';


describe('MarketingBadge', () => {
  it('should render null if no promotion is provided', () => {
    const promotion = fromJS({ code: '' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render PREZZO_GIU', () => {
    const promotion = fromJS({ code: 'PREZZO_GIU' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.PrezzoGiu);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render NOVITA', () => {
    const promotion = fromJS({ code: 'NOVITA' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(Novita);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render PROMO_WEB', () => {
    const promotion = fromJS({ code: 'PROMO_WEB' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.PromoWeb);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render DESTOCK', () => {
    const promotion = fromJS({ code: 'DESTOCK' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.Destock);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render PREZZO_STOCK', () => {
    const promotion = fromJS({ code: 'PREZZO_STOCK' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.PrezzoStock);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render PREZZO_VINCENTE', () => {
    const promotion = fromJS({ code: 'PREZZO_VINCENTE' });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.PrezzoVincente);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });

  it('should render IDEAPIU', () => {
    const promotion = fromJS({ code: 'IDEAPIU', value: 10 });
    const result = mount(
      <MarketingBadge promotion={promotion} />
    );
    const badge = result.find(badges.IdeaPiu);
    expect(result).toMatchSnapshot();
    expect(badge).toBeDefined();
  });
});
