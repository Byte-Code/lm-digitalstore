import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';

import { formatPrice } from '../utils/utils';

export const Discount = glamorous.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  fontSize: '16px',
  marginBottom: '5px',
  '&>span': {
    '&:first-child': {
      color: '#cc0000'
    },
    color: '#000',
    textDecoration: 'line-through'
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

export default class PriceBadge extends Component {
  static propTypes = {
    pricingInfo: ImmutablePropTypes.map.isRequired,
    price: ImmutablePropTypes.map.isRequired
  };

  render() {
    const { pricingInfo, price } = this.props;
    const grossPrice = price.get('gross');
    const listPrice = price.get('list');
    const isDiscounted = listPrice && listPrice - grossPrice > 1;
    const discount = price.get('discount');
    const sellingCapacity = pricingInfo.get('sellingCapacity') || 1;
    const sellingUnit = pricingInfo.get('sellingUnit');

    return (
      <div>
        {isDiscounted &&
          <Discount>
            <span>-{Math.ceil(discount)} %</span>
            <span>{formatPrice(listPrice)}€</span>
          </Discount>}
        <MainPrice isDiscounted={isDiscounted}>
          {formatPrice(grossPrice)} €
        </MainPrice>
        <Quantity>{`${sellingCapacity} ${sellingUnit} / ${sellingUnit}`}</Quantity>
      </div>
    );
  }
}
