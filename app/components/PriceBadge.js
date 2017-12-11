import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import { Map } from 'immutable';

import { formatPrice } from '../utils/utils';

export const Discount = glamorous.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  fontSize: '16px',
  marginBottom: '15px',
  '&>span': {
    '&:first-child': {
      color: '#cc0000'
    },
    '&:last-child': {
      color: '#000',
      textDecoration: 'line-through'
    },
    fontSize: '14px',
    fontWeight: 300,
    color: '#333333'
  }
});

const MainPrice = glamorous.p(({ isDiscounted }) => ({
  fontSize: '36px',
  textAlign: 'right',
  marginBottom: '3px',
  color: isDiscounted ? '#cc0000' : '#000'
}));

const Quantity = glamorous.p({
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Light',
  textAlign: 'right'
});

const Wrapper = glamorous.div({
  marginTop: '15px'
});

const Untill = glamorous.div({
  marginBottom: '3%'
});

export default class PriceBadge extends Component {
  static propTypes = {
    pricingInfo: ImmutablePropTypes.map,
    price: ImmutablePropTypes.map
  };

  static defaultProps = {
    pricingInfo: Map(),
    price: Map()
  };

  render() {
    const { pricingInfo, price } = this.props;
    const grossPrice = price.get('gross');
    const listPrice = price.get('list');
    const isDiscounted = listPrice && listPrice - grossPrice > 1;
    const discount = price.get('discount');
    const sellingCapacity = pricingInfo.get('sellingCapacity') || 1;
    const sellingUnit = pricingInfo.get('sellingUnit');
    const toDate = price.get('to');
    let until = null;

    if (toDate) {
      until = `FINO AL ${toDate.substring(6, 8)}/${toDate.substring(4, 6)}`;
    }

    return (
      <Wrapper>
        {isDiscounted &&
          <Discount>
            <span>-{Math.round(discount)} %</span>
            <span>{formatPrice(listPrice)}€</span>
          </Discount>}
        <Untill>
          {until && <span>{until}</span>}
        </Untill>
        <MainPrice isDiscounted={isDiscounted}>
          {formatPrice(grossPrice)} €
        </MainPrice>
        <Quantity>{`${sellingCapacity} ${sellingUnit} / ${sellingUnit}`}</Quantity>
      </Wrapper>
    );
  }
}
